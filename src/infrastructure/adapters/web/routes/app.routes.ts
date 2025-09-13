import { Router } from 'express';
import { AppController } from '../controllers/AppController';

export function createAppRoutes(appController: AppController): Router {
  const router = Router();
  router.get('/', appController.welcomeMessage);
  return router;
}
