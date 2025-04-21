const sequelize = require("./db");

async function syncDB() {
  await sequelize.sync();
}
const Card = require("./models/Card");
const Category = require("./models/Category");
const CardCategory = require("./models/CardCategory");

Card.belongsToMany(Category, { through: CardCategory });
Category.belongsToMany(Card, { through: CardCategory });


syncDB()
  .then(() => {
    console.log("Database synced");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error during sync");
    console.trace(error);
    process.exit(1);
  });
