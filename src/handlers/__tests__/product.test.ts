import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  test("should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});

    expect(response.statusCode).not.toBe(201);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
  });

  test("should validate that the price is greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "test",
      price: -1,
    });

    expect(response.statusCode).not.toBe(201);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
  });

  test("should validate that the price is a number and greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "test",
      price: "hola",
    });

    expect(response.statusCode).not.toBe(201);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);
  });

  test("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Mouse - Testing",
      price: 50,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.statusCode).not.toBe(200);
    expect(response.statusCode).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products", () => {
  test("should check if api/products url exists ", async () => {
    const response = await request(server).get("/api/products");
    expect(response.statusCode).not.toBe(404);
  });
  test("GET a JSON response with products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toHaveProperty("errors");
  });
});
