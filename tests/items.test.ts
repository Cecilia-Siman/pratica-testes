import app from "../src/app";
import supertest from 'supertest';
import {createItem} from "./factories/itemFactory";

describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto', async () => {
    const body = await createItem();
    
    const result = await supertest(app).post("/items").send(body);
    const status = result.status;

    expect(status).toBe(201);
  });
  it('Deve retornar 409, ao tentar cadastrar um item que exista', async () => {
    const body = await createItem();
    
    const createFirst = await supertest(app).post("/items").send(body);
    const result = await supertest(app).post("/items").send(body);
    const status = result.status;

    expect(status).toBe(409);
  });
});

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array', async () => {

    const result = await supertest(app).get("/items");
    const status = result.status;
    
    expect(status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

describe('Testa GET /items/:id ', () => {
  it('Deve retornar status 200 e um objeto igual a o item cadastrado', async () => {
    const result = await supertest(app).get("/items/1");
    const status = result.status;

    expect(status).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
  });
  it('Deve retornar status 404 caso não exista um item com esse id', async () => {
    const result = await supertest(app).get("/items/100");
    const status = result.status;

    expect(status).toEqual(404);
  });
});
