import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "src/models/User";

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const userRepository = getRepository(User);

    try {
      const user = userRepository.create({
        name,
        email,
      });

      await userRepository.save(user);

      return response.status(201).send({ user });
    } catch (err: any) {
      if (err.errno === 1062)
        return response
          .status(409)
          .send({ error: "This e-mail address has already been registered." });

      return response.status(400).send({ error: err });
    }
  },
};
