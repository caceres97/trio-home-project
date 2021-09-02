import Controller from "../utils/Controller";
import { Request, Response } from "express";

class ContactController extends Controller {
    constructor() {
        super();
    }

    /*
        I already create a list in sendGrid
        Name: AC-Testing 
        Id: 3d0aa94a-0e06-4276-b6d1-854317cfca6a
    */
    syncResources = async (req: Request, res: Response) => {
        try {
            const rawContacts = await this.getLists().getListMembersInfo('16dfebb33e')

            const parsedContacts: [any] = rawContacts.members.map((contact: any, index: number) => {
                return {
                    email: contact.email_address,
                    // first_name: contact.full_name
                }
            })

            const request = {
                body: {
                    list_ids: ["3d0aa94a-0e06-4276-b6d1-854317cfca6a"],
                    contacts: parsedContacts
                },
                method: 'PUT',
                // method: 'DELETE',
                url: '/v3/marketing/contacts'
                // url: '/v3/marketing/contacts?delete_all_contacts=true'
            };

            const updatedUsers = await this.getSgInstance().request(request)

            if (updatedUsers[0].statusCode == 202) {
                res.status(200).send({
                    "syncedContacts": parsedContacts.length, // total synced contacts
                    "contacts": parsedContacts
                })
            } else {
                res.status(500).send({
                    message: "Error",
                    error: updatedUsers
                })
            }
        } catch (error) {
            res.status(500).send({
                message: "Unexpected error",
                error,
            });
        }
    };

    //To create testing users
    createResource = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const contactData = req.body
            const addedContact = await this.getLists().addListMember(id, contactData) as any

            if (addedContact.id) {
                res.status(201).send({
                    message: "Resource created",
                    data: addedContact
                })
            } else {
                res.status(500).send({
                    message: "Error",
                    data: addedContact
                })
            }
        } catch (error) {
            res.status(500).send({
                message: "Unexpected error",
                error,
            });
        }
    };
}

const contactController = new ContactController();
export default contactController;
