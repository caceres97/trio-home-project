import contactController from '../controllers/contactController';
import listController from '../controllers/listController';
import Routes from '../utils/routes'

class ListRoutes extends Routes {
    constructor() {
        super();

        this.getMailchimpListContacts()
        this.getSendgridListContacts()
        this.createContact()

        //404 Error
        this.urlNotFound()
    }

    public getMailchimpListContacts = (): void => {
        this.router.get('/:id/mcontacts', listController.getMailchimpResources)
    }

    public getSendgridListContacts = (): void => {
        this.router.get('/:id/scontacts', listController.getSendgridResources)
    }

    public createContact = (): void => {
        this.router.post('/:id/contacts', contactController.createResource)
    }
}

const listRoutes = new ListRoutes();
export default listRoutes.router