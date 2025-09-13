import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export function createUserRoutes(userController: UserController): Router {
  const router = Router();
  router.post('/', userController.createUser.bind(userController));
  return router;
}
