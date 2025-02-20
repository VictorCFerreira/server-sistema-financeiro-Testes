
import app from "./app";
import { AppDataSource, MAIN_DATABASE, Maintenance } from "./persistence/data-source";

const PORT = process.env.PORT || 4791;

Maintenance.initialize().then(() => {
  Maintenance.query(`Create database ${MAIN_DATABASE};`)
    .catch(() => {})
    .finally(() => {
      AppDataSource.initialize()
        .then(() => {
          AppDataSource.query(`CREATE EXTENSION if not exists unaccent;`)
            .then(() => {})
            .catch(() => {});
          app.listen(PORT, async () => {
            console.log(
              `\n======> Server is running in port: ${PORT}! :D <======\n`
            );
          });
        })
        .catch((error) => {
          console.log("Ops! Ocorreu um erro.");
          console.error(error);
        });
    });
});

