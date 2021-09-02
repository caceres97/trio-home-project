import express, { Application } from "express";
import morgan from 'morgan';
import cors from "cors";
import contactRoutes from "./routes/contactRoutes";
import listRoutes from "./routes/listRoutes";

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // this.app.use(Middelwares.authVerificator)
    //this.app.use(expressip().getIpInfoMiddleware);
  }

  routes(): void {
    this.app.use("/contacts", contactRoutes);
    this.app.use("/lists", listRoutes);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port " + this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
