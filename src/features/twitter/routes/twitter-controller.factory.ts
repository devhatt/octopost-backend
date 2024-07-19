import { TwitterController } from '../controllers/twitter-controller';

export function twitterControllerFactory() {
  const twitterController = new TwitterController();

  return {
    twitterController,
  };
}
