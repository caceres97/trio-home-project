import contactController from '../controllers/contactController';
import Routes from '../utils/routes'

class ContactRoutes extends Routes {
    constructor() {
        super();

        this.syncResources()

        //404 Error
        // @ts-ignore
        this.urlNotFound()
    }

    // @ts-ignore
    public syncResources = (): void => {
        this.router.post('/sync', contactController.syncResources)
    }
}

// @ts-ignore
const contactRoutes = new ContactRoutes();
export default contactRoutes.router