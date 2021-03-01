import SurveysRepository from "@repositories/SurveysRepository";
import UsersRepository from "@repositories/UsersRepository";
import SurveysUsersRepository from "@repositories/SurveysUsersRepository";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SendMailService from "src/services/SendMailService";
import path from "path";

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

      let surveyUser = await surveysUsersRepository.findOne({
        where: [{ userId: user.id }, { surveyId: survey.id }],
        relations: ["user", "survey"],
      });

      if (!surveyUser) {
        console.log(
          "User has not already interacted with this survey, creating..."
        );
        surveyUser = await surveysUsersRepository.create({
          userId: user.id,
          surveyId,
        });

        await surveysUsersRepository.save(surveyUser);
      }
      // #TODO refactor sendMail args into an object

      const sendMailService = await SendMailService.build();
      await sendMailService.sendMail(
        userEmail,
        user.name,
        survey.title,
        survey.description,
        surveyUser.id,
        path.resolve(__dirname, "..", "views", "emails", "npsMail.hbs")
      );

      return response.status(201).send({ surveyUser });
    } catch (err: any) {
      return response.status(400).send({ error: err });
    }
  }
}
