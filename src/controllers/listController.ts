import Controller from "../utils/Controller";
import { Request, response, Response } from "express";


class ListController extends Controller {
    constructor() {
        super();
    }

    //Just for check
    getMailchimpResources = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const response: any = await this.getLists().getListMembersInfo(id)
            res.send(response)
        } catch (error) {
            res.status(500).send({
                message: "Unexpected error",
                error,
            });
        }
    };

    getSendgridResources = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const request = {
                method: 'GET',
                url: `/v3/marketing/lists/${id}`
            };

            this.getSgInstance().request(request)
                .then(([response, body]) => {
                    res.send({
                        status: response.statusCode,
                        data: response.body
                    })
                }).catch(function (error) {
                    console.error(error.response.body);
                });
        } catch (error) {
            res.status(500).send({
                message: "Unexpected error",
                error,
            });
        }
    }

}

const listController = new ListController();
export default listController;