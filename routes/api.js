const { Router } = require("express");
const cardController = require("../controllers/cardController");
const columnController = require("../controllers/columnController");
const categoryController = require("../controllers/categoryController");

function createApiRoutes() {
  const router = Router();
  // CRUD pour les cartes
  router.get("/cards", cardController.getAllCards);
  router.post("/cards", cardController.createCard);
  router.get("/cards/:id", cardController.getCardById);
  router.put("/cards/:id", cardController.updateCard);
  router.delete("/cards/:id", cardController.deleteCard);
  // Déplacement d'une carte
  router.put("/cards/:id/move", cardController.moveCard);

  //CRUD pour les colonnes
  router.get("/columns", columnController.getAllColumns);
  router.post("/columns", columnController.createColumn);
  router.get("/columns/:id", columnController.getColumnById);
  router.put("/columns/:id", columnController.updateColumn);
  router.delete("/columns/:id", columnController.deleteColumn);

  //CRUD pour les categories
  router.get("/categories", categoryController.getAllCategories);
  router.post("/categories", categoryController.createCategory);
  router.get("/categories/:id", categoryController.getCategoryById);
  router.put("/categories/:id", categoryController.updateCategory);
  router.delete("/categories/:id", categoryController.deleteCategory);

  // CRUD pour les associations entre cartes et catégories
  return router;
}

module.exports = createApiRoutes;
