import express, { Router } from 'express';

export function startServer(router: Router, port: number): void {
  const app = express();

  app.use(express.json());
  app.use('/api', router); // Adicionado prefixo /api

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
