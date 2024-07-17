import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as fs from 'fs';

@Injectable()
export class GoogleDriveService {
  private oauth2Client: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    const clientId = this.configService.get<string>('oauth.clientId');
    const clientSecret = this.configService.get<string>('oauth.clientSecret');
    const redirectUri = this.configService.get<string>('oauth.redirectUri');
    const refreshToken = this.configService.get<string>('oauth.refreshToken');
    this.oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    this.oauth2Client.setCredentials({refresh_token: refreshToken})
  }

  async uploadToDrive(filePath: string, fileName: string, fileType: string) {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    const metaData = {
      name: fileName,
      parents: ["1l4q9d7WN_XkFpbzMsF_KfGI5geddTOw6"]
    }
    const mimeType = fileType
    const media = { mimeType, body: fs.createReadStream(filePath) };
    
    try {
      const response = await drive.files.create({
        requestBody: metaData,
        media: media,
        fields: 'id',
      });

      const fileId = response.data.id;
      const sharedLink = mimeType != "application/pdf" ? `https://drive.google.com/uc?id=${fileId}` : `https://drive.google.com/file/d/${fileId}/view?usp=drive_link`;

      await drive.permissions.create({
        fileId: fileId!,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      return sharedLink;
    } catch (err) {
      console.error(err)
      return null;
    }
  }
}