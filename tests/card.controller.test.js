
const request = require('supertest');
const app = require('../index'); // remplace par ton chemin vers app.js ou server.js
const { Card } = require('../models');

jest.mock('../models');

describe('Card Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCards', () => {
    it('doit retourner toutes les cartes', async () => {
      const fakeCards = [{ id: 1, description: 'Test card' }];
      Card.findAll.mockResolvedValue(fakeCards);

      const res = await request(app).get('/api/cards/');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(fakeCards);
      expect(Card.findAll).toHaveBeenCalled();
    });

    it('doit retourner une erreur serveur', async () => {
      Card.findAll.mockRejectedValue(new Error('Erreur'));

      const res = await request(app).get('/api/cards/');

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe('Erreur serveur');
    });
  });

  describe('createCard', () => {
    it('doit créer une carte', async () => {
      const newCard = { id: 1, description: 'Nouvelle carte' };
      const cardWithAssociations = { ...newCard, column: {}, categories: [] };

      Card.create.mockResolvedValue(newCard);
      Card.findByPk.mockResolvedValue(cardWithAssociations);

      const res = await request(app)
        .post('/api/cards/')
        .send({ description: 'Nouvelle carte', columnId: 1 });

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(cardWithAssociations);
      expect(Card.create).toHaveBeenCalledWith({ description: 'Nouvelle carte', columnId: 1 });
    });

    it('doit retourner une erreur lors de la création', async () => {
      Card.create.mockRejectedValue(new Error('Erreur'));

      const res = await request(app)
        .post('/api/cards/')
        .send({ description: 'Erreur carte', columnId: 1 });

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe('Erreur lors de la création de la carte');
    });
  });

  describe('getCardById', () => {
    it('doit retourner une carte spécifique', async () => {
      const card = { id: 1, description: 'Carte spécifique' };
      Card.findByPk.mockResolvedValue(card);

      const res = await request(app).get('/api/cards/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(card);
    });

    it('doit retourner 404 si carte non trouvée', async () => {
      Card.findByPk.mockResolvedValue(null);

      const res = await request(app).get('/api/cards/2');

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Carte non trouvée');
    });

    it('doit retourner une erreur serveur', async () => {
      Card.findByPk.mockRejectedValue(new Error('Erreur'));

      const res = await request(app).get('/api/cards/1');

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe('Erreur serveur');
    });
  });

  describe('updateCard', () => {
    it('doit mettre à jour une carte', async () => {
      const card = { id: 1, update: jest.fn(), setCategories: jest.fn() };
      const updatedCard = { id: 1, description: 'Carte mise à jour', column: {}, categories: [] };

      Card.findByPk
        .mockResolvedValueOnce(card) // pour findByPk avant update
        .mockResolvedValueOnce(updatedCard); // pour findByPk après update

      const res = await request(app)
        .put('/api/cards/1')
        .send({ description: 'Carte mise à jour', columnId: 2 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(updatedCard);
      expect(card.update).toHaveBeenCalledWith({ description: 'Carte mise à jour', columnId: 2 });
    });

    it('doit retourner 404 si carte non trouvée pour update', async () => {
      Card.findByPk.mockResolvedValue(null);

      const res = await request(app)
        .put('/api/cards/4')
        .send({ description: 'Carte introuvable' });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Carte non trouvée');
    });

    it('doit retourner une erreur serveur lors de update', async () => {
      Card.findByPk.mockRejectedValue(new Error('Erreur'));

      const res = await request(app)
        .put('/api/cards/1')
        .send({ description: 'Carte erreur' });

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe('Erreur lors de la mise à jour');
    });
  });

  describe('deleteCard', () => {
    it('doit supprimer une carte', async () => {
      const card = { id: 1, destroy: jest.fn() };
      Card.findByPk.mockResolvedValue(card);

      const res = await request(app).delete('/api/cards/1');

      expect(res.statusCode).toBe(204);
      expect(card.destroy).toHaveBeenCalled();
    });

    it('doit retourner 404 si carte non trouvée pour suppression', async () => {
      Card.findByPk.mockResolvedValue(null);

      const res = await request(app).delete('/api/cards/3');

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Carte non trouvée');
    });

    it('doit retourner une erreur serveur lors de suppression', async () => {
      Card.findByPk.mockRejectedValue(new Error('Erreur'));

      const res = await request(app).delete('/api/cards/1');

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe('Erreur lors de la suppression');
    });
  });

});
