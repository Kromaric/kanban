const { Column } = require("../models");

// Récupérer toutes les colonnes
exports.getAllColumns = async (req, res) => {
  try {
    const columns = await Column.findAll(
        {
            order: [['position', 'ASC']]
        }
    );
    res.json(columns);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des colonnes", error: err.message });
  }
};

// Créer une nouvelle colonne
exports.createColumn = async (req, res) => {
  try {
    const { title } = req.body;
    const column = await Column.create({ title });
    res.status(201).json(column);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création de la colonne", error: err.message });
  }
};

// Récupérer une colonne par ID
exports.getColumnById = async (req, res) => {
  try {
    const { id } = req.params;
    const column = await Column.findByPk(id);
    if (!column) {
      return res.status(404).json({ message: "Colonne non trouvée" });
    }
    res.json(column);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération de la colonne", error: err.message });
  }
};

// Mettre à jour une colonne
exports.updateColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const column = await Column.findByPk(id);
    if (!column) {
      return res.status(404).json({ message: "Colonne non trouvée" });
    }
    column.title = title;
    await column.save();
    res.json(column);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la colonne", error: err.message });
  }
};

// Supprimer une colonne
exports.deleteColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const column = await Column.findByPk(id);
    if (!column) {
      return res.status(404).json({ message: "Colonne non trouvée" });
    }
    await column.destroy();
    //res.json({ message: "Colonne supprimée avec succès" });
    res.status(204).send(); // Pas de contenu à retourner
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression de la colonne", error: err.message });
  }
};
