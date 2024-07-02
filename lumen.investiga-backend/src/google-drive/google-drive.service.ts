import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GoogleDriveService {
  private oauth2Client: OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    const clientId = this.configService.get<string>('oauth.clientId');
    const clientSecret = this.configService.get<string>('oauth.clientSecret');

    this.oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  }

  async uploadToDrive(filePath: string, fileName: string) {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    const metaData = {
      name: fileName,
      parents: ["1l4q9d7WN_XkFpbzMsF_KfGI5geddTOw6?usp=drive_link"]
    }
    
  }
}