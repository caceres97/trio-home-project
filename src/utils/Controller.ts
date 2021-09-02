// import dotenv from "dotenv";
import dotenv from "dotenv";
const mailchimp = require('@mailchimp/mailchimp_marketing/src/index.js');
const sgClient = require('@sendgrid/client');

class Controller {
    constructor() {
        dotenv.config();
        mailchimp.setConfig({
            apiKey: String(process.env.MKEY),
            server: String(process.env.MSERVER),
        })

        sgClient.setApiKey(String(process.env.SKEY));
    }

    //I put this if I need more configurations
    getLists = () => {
        return mailchimp.lists
    }

    getSgInstance = () => {
        return sgClient
    }

}

export default Controller;
