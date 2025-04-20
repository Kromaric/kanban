const homeController = {
  homepage(_request, response) {
    response.render("pages/helloWorld");
  },
};

module.exports = homeController;
