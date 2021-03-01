import { Server } from "http";
import request, { SuperAgentTest } from "supertest";
import { Connection, createConnection } from "typeorm";
import app from "../app";
import { testConnectionOptions } from "../database/ormconfig";

let server: Server;
let agent: SuperAgentTest;
let connection: Connection;

describe("Users", () => {
  beforeAll(async () => {
    connection = await createConnection(testConnectionOptions);

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

  it("Should be able to create a new user", async () => {
    const response = await agent.post("/users").send({
      email: "user@example.com",
      name: "Random Person",
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new user due to existing email", async () => {
    const response = await agent.post("/users").send({
      email: "user@example.com",
      name: "Random Person",
    });

    expect(response.status).toBe(409);
  });

  afterAll(async () => {
    connection.close();
  });
});
