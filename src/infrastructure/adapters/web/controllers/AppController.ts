import { Request, Response } from 'express';

export class AppController {
  public welcomeMessage(req: Request, res: Response): Response {
    return res.status(200).send('Bem-vindo à BRSA!');
  }
}