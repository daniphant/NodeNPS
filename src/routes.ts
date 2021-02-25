import SurveyController from "@controllers/SurveyController";
import UserController from "@controllers/UserController";
import { Router } from "express";

const routes = Router();

routes.post("/users", UserController.create);

routes.post("/surveys", SurveyController.create);
routes.get("/surveys", SurveyController.index);

export default routes;
