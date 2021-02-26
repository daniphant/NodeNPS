import { Server } from "http";
import request, { SuperAgentTest } from "supertest";
import { createConnection } from "typeorm";
import app from "../app";
import { connectionOptions } from "../database/ormconfig";

let server: Server;
let agent: SuperAgentTest;

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection(
      connectionOptions[process.env.NODE_ENV]
    );

    await connection.dropDatabase();
    await connection.runMigrations();
  });

  beforeEach(done => {
    server = app.listen(4000, () => {
      agent = request.agent(server); // since the application is already listening, it should use the allocated port
      done();
    });
  });

  afterEach(done => server && server.close(done));

  it("Should be able to create all surveys", async () => {
    const response = await agent.post("/surveys").send({
      title: "Give us your opinion! It's important to us!",
      description: "What are your thoughts on Ugandan Knuckles?",
    });

    expect(response.status).toBe(201);
  });

  it("Should be able to retrieve all surveys in the database", async () => {
    const response = await agent.get("/surveys");

    expect(response.status).toBe(200);
  });
});
