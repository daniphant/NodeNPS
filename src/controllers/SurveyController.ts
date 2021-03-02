import Survey from "@models/Survey";
import SurveysRepository from "@repositories/SurveysRepository";
import { Request, Response } from "express";
import { DeepPartial, getCustomRepository } from "typeorm";

export default class SurveyController {
  static async create(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;

    const surveyRepository = getCustomRepository(SurveysRepository);

    try {
      const survey = surveyRepository.create({
        title,
        description,
      });

      await surveyRepository.save(survey);

      return response.status(201).send({ survey });
    } catch (err: any) {
      return response.status(400).send({ error: err });
    }
  }

  static async index(_: any, response: Response): Promise<Response> {
    const surveyRepository = getCustomRepository(SurveysRepository);

    try {
      const registeredSurveys = await surveyRepository.find();

      return response.status(200).send({ surveys: registeredSurveys });
    } catch (err: any) {
      return response.status(400).send({ error: err });
    }
  }

  static async getSurveyIfExists(
    queryParameters: DeepPartial<Survey>
  ): Promise<Survey | false> {
    try {
      const surveyRepository = getCustomRepository(SurveysRepository);
      const survey = await surveyRepository.findOne(queryParameters);

      if (!survey) return false;

      return survey;
    } catch (err: any) {
      console.log(err);
    }

    return false;
  }
}
