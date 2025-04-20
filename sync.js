const sequelize = require("./db");

async function syncDB() {
  await sequelize.sync();
}

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
