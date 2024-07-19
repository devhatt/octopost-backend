// import axios from 'axios';
// import type { Request, Response } from 'express';

// import { CLIENT_URL } from './config';

// // add your client id and secret here:
// const TWITTER_OAUTH_CLIENT_ID = 'T1dLaHdFSWVfTnEtQ2psZThTbnI6MTpjaQ';
// const TWITTER_OAUTH_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET!;

// // the url where we get the twitter access token from
// const TWITTER_OAUTH_TOKEN_URL = 'https://api.twitter.com/2/oauth2/token';

// // we need to encrypt our twitter client id and secret here in base 64 (stated in twitter documentation)
// const BasicAuthToken = Buffer.from(
//   `${TWITTER_OAUTH_CLIENT_ID}:${TWITTER_OAUTH_CLIENT_SECRET}`,
//   'utf8'
// ).toString('base64');

// // filling up the query parameters needed to request for getting the token
// export const twitterOauthTokenParams = {
//   client_id: TWITTER_OAUTH_CLIENT_ID,
//   code_verifier: '8KxxO-RPl0bLSxX5AWwgdiFbMnry_VOKzFeIlVA7NoA',
//   grant_type: 'authorization_code',
//   redirect_uri: `http://www.localhost:3001/oauth/twitter`,
// };

// // the shape of the object we should recieve from twitter in the request
// type TwitterTokenResponse = {
//   access_token: string;
//   expires_in: 7200;
//   scope: string;
//   token_type: 'bearer';
// };

// // the main step 1 function, getting the access token from twitter using the code that the twitter sent us
// export async function getTwitterOAuthToken(code: string) {
//   try {
//     // POST request to the token url to get the access token
//     const res = await axios.post<TwitterTokenResponse>(
//       TWITTER_OAUTH_TOKEN_URL,
//       new URLSearchParams({ ...twitterOauthTokenParams, code }).toString(),
//       {
//         headers: {
//           Authorization: `Basic ${BasicAuthToken}`,
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );

//     return res.data;
//   } catch (err) {
//     return null;
//   }
// }

// // the shape of the response we should get
// export interface TwitterUser {
//   id: string;
//   name: string;
//   username: string;
// }

// // getting the twitter user from access token
// export async function getTwitterUser(
//   accessToken: string
// ): Promise<null | TwitterUser> {
//   try {
//     // request GET https://api.twitter.com/2/users/me
//     const res = await axios.get<{ data: TwitterUser }>(
//       'https://api.twitter.com/2/users/me',
//       {
//         headers: {
//           // put the access token in the Authorization Bearer token
//           Authorization: `Bearer ${accessToken}`,
//           'Content-type': 'application/json',
//         },
//       }
//     );

//     return res.data.data ?? null;
//   } catch (err) {
//     return null;
//   }
// }

// // the function which will be called when twitter redirects to the server at http://www.localhost:3001/oauth/twitter
// export async function twitterOauth(
//   req: Request<any, any, any, { code: string }>,
//   res: Response
// ) {
//   const code = req.query.code;

//   // 1. get the access token with the code
//   const TwitterOAuthToken = await getTwitterOAuthToken(code);
//   console.log(TwitterOAuthToken);

//   if (!TwitterOAuthToken) {
//     // redirect if no auth token
//     return res.redirect(CLIENT_URL);
//   }

//   // 2. get the twitter user using the access token
//   const twitterUser = await getTwitterUser(TwitterOAuthToken.access_token);
//   console.log(twitterUser);

//   if (!twitterUser) {
//     // redirect if no twitter user
//     return res.redirect(CLIENT_URL);
//   }

//   // 3. upsert the user in our db

//   // 4. create cookie so that the server can validate the user

//   // 5. finally redirect to the client

//   return res.redirect(CLIENT_URL);
// }
