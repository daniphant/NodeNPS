import { Request, Response } from "express";

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const { body } = request;

    return response.json(body);
  },
};
