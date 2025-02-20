import { AppDataSource } from "../src/persistence/data-source";
import request from "supertest";
import app from "../src/app";

beforeAll(async () => {
  // Inicialize a conexão com o banco de dados antes de rodar os testes
  await AppDataSource.initialize();
});

afterAll(async () => {
  // Feche a conexão após todos os testes
  await AppDataSource.destroy();
});

describe("Testes para Usuario", () => {
  let usuarioId: any;

  test("Deve criar um novo usuário", async () => {
    const response = await request(app)
      .post("/server/usuario")
      .send({ nome: "Teste", email: "teste@email.com" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    usuarioId = response.body.id;
  });

  test("Deve listar os usuários", async () => {
    const response = await request(app).get("/server/usuario");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("Deve obter um usuário pelo ID", async () => {
    const response = await request(app).get(`/server/usuario/${usuarioId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(usuarioId);
  });

  test("Deve deletar um usuário pelo ID", async () => {
    const response = await request(app).delete(`/server/usuario/${usuarioId}`);
    expect(response.status).toBe(204);
  });
});
