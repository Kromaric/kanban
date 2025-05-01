const request = require("supertest");
const app = require("../index");
const { Column } = require("../models"); 

describe("Column API", () => {
  let columnId = 4;

  it("devrait créer une nouvelle colonne", async () => {
    const res = await request(app)
      .post("/api/columns")
      .send({
        title: "Test Column",
        position: 1
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test Column");
    columnId = res.body.id; // on stocke l'id pour les autres tests
  });

  it("devrait obtenir toutes les colonnes", async () => {
    const res = await request(app).get("/api/columns");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("devrait mettre à jour une colonne", async () => {
    const res = await request(app)
      .put(`/api/columns/${columnId}`)
      .send({
        title: "Updated Column"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe("Updated Column");
  });

  it("devrait supprimer une colonne", async () => {
    const res = await request(app)
      .delete(`/api/columns/${columnId}`);

    expect(res.statusCode).toEqual(204); // pas de contenu
  });
});
