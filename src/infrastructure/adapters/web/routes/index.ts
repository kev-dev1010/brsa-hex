import { Router } from "express";
import { AppController } from "../controllers/AppController";
import { UserController } from "../controllers/UserController";
import { createAppRoutes } from "./app.routes";
import { createUserRoutes } from "./user.routes";

export function createApiRouter(userController: UserController, appController: AppController): Router {
  const router = Router();

  // Monta as rotas modulares
  router.use('/', createAppRoutes(appController));
  router.use('/users', createUserRoutes(userController));

  return router;
}
