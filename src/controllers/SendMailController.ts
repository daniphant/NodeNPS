import SurveysUsersRepository from "@repositories/SurveysUsersRepository";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SendMailService from "src/services/SendMailService";
import path from "path";
import User from "@models/User";
import Survey from "@models/Survey";
import SurveyUser from "@models/SurveyUser";
import SurveyController from "./SurveyController";
import UserController from "./UserController";

export default class SendMailController {
  // #TODO: think of a better name
  static async handleSendMailRequest(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { userEmail, surveyId } = request.body;

      const user = await UserController.getUserIfExists({ email: userEmail });
      if (!user) return response.status(400).send({ error: "User not found" });

      const survey = await SurveyController.getSurveyIfExists({ id: surveyId });
      if (!survey)
        return response.status(400).send({ error: "Survey not found" });

      const [
        surveyUser,
        message,
        responseStatus,
      ] = await SendMailController.createSurveyUserIfNotExists(
        user.id,
        survey.id
      );

      if (!(responseStatus >= 400 && responseStatus < 500) && surveyUser)
        await SendMailController.SendMail(user, survey, surveyUser);

      return response.status(responseStatus).send(message);
    } catch (err: any) {
      return response.status(400).send({ error: err });
    }
  }

  /* Creates a survey, by first verifying if a user with the given email and a survey with the given id exist */
  static async createSurveyUserIfNotExists(
    userId: string,
    surveyId: string
  ): Promise<[SurveyUser | undefined, {}, number]> {
    try {
      const surveysUsersRepository = getCustomRepository(
        SurveysUsersRepository
      );

      let surveyUser = await surveysUsersRepository.findOne({
        where: [{ userId }, { surveyId }],
        relations: ["user", "survey"],
      });

      if (!surveyUser) {
        surveyUser = surveysUsersRepository.create({
          userId,
          surveyId,
        });

        await surveysUsersRepository.save(surveyUser);
        return [surveyUser, { surveyUser }, 201];
      }

      if (surveyUser.value === null)
        return [
          undefined,
          { error: "User has already answered this survey!" },
          409,
        ];

      return [surveyUser, { surveyUser }, 200];
    } catch (err: any) {
      return [undefined, { error: err }, 400];
    }
  }

  static async SendMail(user: User, survey: Survey, surveyUser: SurveyUser) {
    try {
      // #TODO refactor sendMail args into an object
      const sendMailService = await SendMailService.build();
      await sendMailService.sendMail(
        user.email,
        user.name,
        survey.title,
        survey.description,
        surveyUser.id,
        path.resolve(__dirname, "..", "views", "emails", "npsMail.hbs")
      );
    } catch (err: any) {
      console.log(err);
    }
  }

  static async answerMail(request: Request, response: Response) {
    try {
      const { value, surveyUserId } = request.params;

      const surveysUsersRepository = getCustomRepository(
        SurveysUsersRepository
      );
      const surveyUser = await surveysUsersRepository.findOne({
        id: surveyUserId,
      });

      if (!surveyUser)
        return response.status(406).send({ error: "survey_user not found" });

      if (surveyUser.value === null)
        return response
          .status(409)
          .send({ error: "User has already answered this survey" });

      surveyUser.value = parseInt(value, 10); // From decimal number to string

      await surveysUsersRepository.save(surveyUser);

      return response.status(200).send({ surveyUser });
    } catch (err: any) {
      return response.status(400).send({ error: err });
    }
  }
}
