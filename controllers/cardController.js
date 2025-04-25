const { Card, Column, Category } = require("../models");

module.exports = {
  // Liste toutes les cartes
  async getAllCards(req, res) {
    try {
      const cards = await Card.findAll({
        order: [['position', 'ASC']],
        include: [
          { model: Column, as: "column", order: [['position', 'ASC']]},
          { model: Category, as: "categories", through: { attributes: [] } },
        ],
      });
      res.status(200).json(cards);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Crée une nouvelle carte
  async createCard(req, res) {
    try {
      const { description, columnId, categoryIds } = req.body;

      const newCard = await Card.create({ description, columnId });

      if (categoryIds && Array.isArray(categoryIds)) {
        await newCard.setCategories(categoryIds);
      }

      const cardWithAssociations = await Card.findByPk(newCard.id, {
        include: [
          { model: Column, as: "column" },
          { model: Category, as: "categories", through: { attributes: [] } },
        ],
      });

      res.status(201).json(cardWithAssociations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la création de la carte" });
    }
  },

  // Récupère une carte spécifique
  async getCardById(req, res) {
    try {
      const card = await Card.findByPk(req.params.id, {
        include: [
          { model: Column, as: "column" },
          { model: Category, as: "categories", through: { attributes: [] } },
        ],
      });

      if (!card) {
        return res.status(404).json({ message: "Carte non trouvée" });
      }

      res.status(200).json(card);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  // Met à jour une carte
  async updateCard(req, res) {
    try {
      const { description, columnId, categoryIds } = req.body;

      const card = await Card.findByPk(req.params.id);
      if (!card) {
        return res.status(404).json({ message: "Carte non trouvée" });
      }

      await card.update({ description, columnId });

      if (categoryIds && Array.isArray(categoryIds)) {
        await card.setCategories(categoryIds);
      }

      const updatedCard = await Card.findByPk(card.id, {
        include: [
          { model: Column, as: "column" },
          { model: Category, as: "categories", through: { attributes: [] } },
        ],
      });

      res.status(200).json(updatedCard);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la mise à jour" });
    }
  },

  //Deplace une carte dans une colonne
  async moveCard(req, res) {
    try {
      const { id } = req.params;
      const { newColumnId } = req.body;
  
      const card = await Card.findByPk(id);
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }
  
      card.columnId = newColumnId;
      await card.save();
  
      res.json({ message: "Card moved successfully", card });
    } catch (error) {
      res.status(500).json({ message: "Error moving card", error });
    }
  },
  
  // Supprime une carte
  async deleteCard(req, res) {
    try {
      const card = await Card.findByPk(req.params.id);
      if (!card) {
        return res.status(404).json({ message: "Carte non trouvée" });
      }

      await card.destroy();
      res.status(200).json({ message: "Carte supprimée" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la suppression" });
    }
  },
};
