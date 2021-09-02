import contactController from '../controllers/contactController';
import Routes from '../utils/routes'

class ContactRoutes extends Routes {
    constructor() {
        super();

        this.syncResources()

        //404 Error
        this.urlNotFound()
    }

    public syncResources = (): void => {
        this.router.post('/sync', contactController.syncResources)
    }
}

const contactRoutes = new ContactRoutes();
export default contactRoutes.router