const homeController = require('../controllers/homeController');

describe('homeController', () => {
  describe('homepage', () => {
    it('doit rendre la page helloWorld', () => {
      const req = {}; // pas utilisé ici
      const res = {
        render: jest.fn(), // on simule response.render
      };

      homeController.homepage(req, res);

      expect(res.render).toHaveBeenCalledWith('pages/helloWorld');
    });
  });
});
