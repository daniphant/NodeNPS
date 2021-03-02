import User from "@models/User";
import UsersRepository from "@repositories/UsersRepository";
import { Request, Response } from "express";
import { DeepPartial, getCustomRepository } from "typeorm";

export default class UserController {
  static async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const userRepository = getCustomRepository(UsersRepository);

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
  }

  static async getUserIfExists(
    queryParameters: DeepPartial<User>
  ): Promise<User | false> {
    try {
      const usersRepository = getCustomRepository(UsersRepository);
      const user = await usersRepository.findOne(queryParameters);

      if (!user) return false;

      return user;
    } catch (err: any) {
      console.log(err);
    }

    return false;
  }
}
