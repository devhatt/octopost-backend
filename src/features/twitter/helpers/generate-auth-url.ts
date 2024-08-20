import 'dotenv/config';

type Input = {
  id: string;
};

export function generateAuthURL({ id }: Input) {
  const baseUrl = 'https://twitter.com/i/oauth2/authorize';
  const clientId = process.env.TWITTER_CLIENT_ID!;

  const params = new URLSearchParams({
    client_id: clientId,
    code_challenge: '-a4-ROPIVaUBVj1qqB2O6eN_qSC0WvET0EdUEhSFqrI',
    code_challenge_method: 'S256',
    redirect_uri: `http://www.localhost:3000/api/twitter/callback`,
    response_type: 'code',
    state: id,
  });

  return `${baseUrl}?${params.toString()}&scope=tweet.write%20tweet.read%20users.read`;
}
