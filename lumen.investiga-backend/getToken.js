const { google } = require('googleapis');

async function getTokens() {
  const oauth2Client = new google.auth.OAuth2(
    '835617247657-fc37sgt8pj5d9hqurecf8kcov03ha2su.apps.googleusercontent.com',
    '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',
    'http://localhost:3000/oauth2callback'
  );

  const { tokens } = await oauth2Client.getToken('4/0ATx3LY4DL8lXUqfpvc-pAmmHbrcmvEAV3EzoXvZTENVEYlN_HBO5IRkMBmFXVi_xeEh_lA');
  console.log(tokens);
}

getTokens().catch(console.error);
