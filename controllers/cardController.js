const { Card, Column, Category } = require("../models");
const { Sequelize } = require('sequelize');


module.exports = {
  // Liste toutes les cartes
  async getAllCards(req, res) {
    try {
      const cards = await Card.findAll({
        order: [['position', 'ASC']],
        include: [
          { model: Column, as: "column", order: [['position', 'ASC']] },
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
      const cardId = req.params.id;
      const { columnId, position } = req.body;
  
      // Ajout de la validation ici
      if (typeof position !== "number" || position < 0) {
        return res.status(400).json({ message: "Invalid position" });
      }
  
      const card = await Card.findByPk(cardId);
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }
  
      const oldColumnId = card.columnId;
  
      if (oldColumnId !== columnId) {
        await Card.update(
          { position: Sequelize.literal('position - 1') },
          {
            where: {
              columnId: oldColumnId,
              position: { [Sequelize.Op.gt]: card.position }
            }
          }
        );
  
        await Card.update(
          { position: Sequelize.literal('position + 1') },
          {
            where: {
              columnId: columnId,
              position: { [Sequelize.Op.gte]: position }
            }
          }
        );
  
        card.columnId = columnId;
        card.position = position;
        await card.save();
  
      } else {
        if (position > card.position) {
          await Card.update(
            { position: Sequelize.literal('position - 1') },
            {
              where: {
                columnId: columnId,
                position: {
                  [Sequelize.Op.gt]: card.position,
                  [Sequelize.Op.lte]: position
                }
              }
            }
          );
        } else if (position < card.position) {
          await Card.update(
            { position: Sequelize.literal('position + 1') },
            {
              where: {
                columnId: columnId,
                position: {
                  [Sequelize.Op.gte]: position,
                  [Sequelize.Op.lt]: card.position
                }
              }
            }
          );
        }
  
        card.position = position;
        await card.save();
      }
  
      res.status(200).json({ message: "Card moved successfully", card });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
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
      //res.status(200).json({ message: "Carte supprimée" });
      res.sendStatus(204).send(); // 204 No Content
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la suppression" });
    }
  },
};
