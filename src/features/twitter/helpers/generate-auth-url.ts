import 'dotenv/config';

export function generateAuthURL() {
  const baseUrl = 'https://twitter.com/i/oauth2/authorize';
  const clientId = process.env.TWITTER_CLIENT_ID || '';

  const params = new URLSearchParams({
    client_id: clientId,
    code_challenge: 'challenge',
    code_challenge_method: 'plain',
    redirect_uri: 'http://www.localhost:3000/api/twitter/callback',
    response_type: 'code',
    state: 'state',
  });

  return `${baseUrl}?${params.toString()}&scope=tweet.write%20tweet.read%20users.read`;
}
