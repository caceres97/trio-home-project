import contactController from '../controllers/contactController';
// import { Routes } from '../utils/routes'
import { Router } from "express";

class ContactRoutes {

    public router: Router = Router()
    constructor() {

        this.syncResources()

        //404 Error
        // this.urlNotFound()
    }

    // @ts-ignore
    public syncResources = (): void => {
        this.router.post('/sync', contactController.syncResources)
    }
}

const contactRoutes = new ContactRoutes();
export default contactRoutes.router