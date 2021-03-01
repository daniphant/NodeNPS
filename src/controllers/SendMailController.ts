import SurveysRepository from "@repositories/SurveysRepository";
import UsersRepository from "@repositories/UsersRepository";
import SurveysUsersRepository from "@repositories/SurveysUsersRepository";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SendMailService from "src/services/SendMailService";

export default class SurveyController {
  static async createSurveyUserAndSendMail(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { userEmail, surveyId } = request.body;

    const surveyRepository = getCustomRepository(SurveysRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    try {
      const user = await usersRepository.findOne({ email: userEmail });

      if (!user) return response.status(400).send({ error: "User not found" });

      const survey = await surveyRepository.findOne({ id: surveyId });

      if (!survey)
        return response.status(400).send({ error: "Survey not found" });

      const surveyUser = await surveysUsersRepository.create({
        userId: user.id,
        surveyId,
      });

      await surveysUsersRepository.save(surveyUser);

      const sendMailService = await SendMailService.build();
      await sendMailService.sendMail(
        userEmail,
        survey.title,
        survey.description
      );

      return response.status(201).send({ surveyUser });
    } catch (err: any) {
      return response.status(400).send({ error: err });
    }
  }
}
