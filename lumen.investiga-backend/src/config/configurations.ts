import * as fs from 'fs';
import * as path from 'path';

export default () => {
  const oauthCredentials = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../credentials.json'), 'utf-8')
  );

  return {
    oauth: {
      clientId: oauthCredentials.web.client_id,
      clientSecret: oauthCredentials.web.client_secret,
    },
  };
};
