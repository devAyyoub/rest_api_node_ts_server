import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  test("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Mouse - Testing",
      price: 50,
    });

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('data')

    expect(response.statusCode).not.toBe(200)
    expect(response.statusCode).not.toBe(404)
    expect(response.body).not.toHaveProperty('error')
  });
});
