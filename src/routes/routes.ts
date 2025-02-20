import { Router } from "express";
import UsuarioController from "../controller/UsuarioController";

const routes = Router();

routes.route('/usuario')
		.get(UsuarioController.index)
		.post(UsuarioController.save);

routes.route('/usuario/:id')
		.get(UsuarioController.show)
		.delete(UsuarioController.remove);

export default routes;