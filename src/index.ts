import env from './config/env';
import app from './config/app';

function startServer() {
  const listener = app.listen(Number(env.PORT), env.HOSTNAME, () => {
    console.log(`Server running at http://localhost:${env.PORT}`);
  });

  listener.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });
}

startServer();
