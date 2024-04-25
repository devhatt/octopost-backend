import env from './config/env.js';
import app from './config/app.js';

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
