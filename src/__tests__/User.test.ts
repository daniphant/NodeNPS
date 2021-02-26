import request from "supertest";
import { createConnection } from "typeorm";
import app from "../app";
import connectionOptions from "../database/ormconfig";

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection(
      connectionOptions[process.env.NODE_ENV]
    );

    await connection.runMigrations();
  });
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "Random Person",
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new user due to existing email", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "Random Person",
    });

    expect(response.status).toBe(409);
  });
});
