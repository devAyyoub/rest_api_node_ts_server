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
  test("should GET a JSON response with products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:id", () => {
  test("should return a 404 for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/products/${productId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
  test("should check a valid ID in the URL", async () => {
    const response = await request(server).get("/api/products/not-valid-url");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });
  test("should get a JSON response for a single product", async () => {
    const response = await request(server).get("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT /api/products/:id", () => {
  test("should check a valid ID in the URL", async () => {
    const response = await request(server)
      .put("/api/products/not-valid-url")
      .send({
        name: "Monitor nuevo curvo",
        price: 500,
        availability: true,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });
  test("should display validation error messages when updating a product", async () => {
    const response = await request(server).put("/api/products/1").send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();

    expect(response.statusCode).not.toBe(200);
  });
  test("should validate that the price is greater than 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor nuevo curvo",
      price: -500,
      availability: true,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();

    expect(response.statusCode).not.toBe(200);
  });
  test("should return a 404 for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Monitor nuevo curvo",
        price: 500,
        availability: true,
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");

    expect(response.statusCode).not.toBe(200);
  });
  test("should update an existing product with valid data", async () => {
    const productId = 2000;
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor nuevo curvo",
      price: 500,
      availability: true,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.statusCode).not.toBe(404);
  });
});
