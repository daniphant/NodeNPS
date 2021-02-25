import UserController from "@controllers/UserController";
import { Router } from "express";

const routes = Router();

routes.post("/users", UserController.create);

export default routes;
