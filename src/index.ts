import { app } from './config/app';
import { env } from './config/env';

function startServer() {
  const listener = app.listen(Number(env.PORT), env.HOSTNAME, () => {
    console.log(`Server running at http://${env.HOSTNAME}:${env.PORT}`);
  });

  listener.on('error', (err) => {
    console.error(err);
    throw err;
  });
}

startServer();
