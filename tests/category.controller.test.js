const request = require("supertest");
const app = require("../index");
const { Category } = require("../models");

describe("Category API", () => {
  let categoryId = 1; // ID de la catégorie à utiliser pour les tests

  afterAll(async () => {
    // Nettoyer après tous les tests
    await Category.destroy({ where: {} });
  });

  it("devrait créer une nouvelle catégorie", async () => {
    const res = await request(app)
      .post("/api/categories")
      .send({ name: "Test Category" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Test Category");
    categoryId = res.body.id;
  });

  it("devrait récupérer toutes les catégories", async () => {
    const res = await request(app).get("/api/categories");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("devrait récupérer une catégorie spécifique", async () => {
    const res = await request(app).get(`/api/categories/${categoryId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(categoryId);
  });

  it("devrait mettre à jour une catégorie", async () => {
    const res = await request(app)
      .put(`/api/categories/${categoryId}`)
      .send({ name: "Updated Category" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("Updated Category");
  });

  it("devrait supprimer une catégorie", async () => {
    const res = await request(app)
      .delete(`/api/categories/${categoryId}`);

    expect(res.statusCode).toEqual(204);
    

  });
});
