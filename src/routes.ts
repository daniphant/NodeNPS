import SurveyController from "@controllers/SurveyController";
import UserController from "@controllers/UserController";
import SendMailController from "@controllers/SendMailController";

import { Router } from "express";

const routes = Router();

routes.post("/users", UserController.create);

routes.post("/surveys", SurveyController.create);
routes.get("/surveys", SurveyController.index);

routes.post("/sendMail", SendMailController.handleSendMailRequest);

routes.get("/answerMail/:value/:surveyUserId", SendMailController.answerMail);

export default routes;
