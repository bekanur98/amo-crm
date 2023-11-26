import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { EnvConfigService } from "src/helper/env-config/env-config.service";

@Injectable()
export class TokenService {
    private accessToken: string;
    private refreshToken: string;
    private expireTokenAt: Date | null = null;
    
    constructor(
      private readonly configService: EnvConfigService,
      private httpService: HttpService,
      ) {}

    async initializeTokens(): Promise<void> {
      try {
        const tokenRequest = {
          client_id: this.configService.getIntegrationId,
          client_secret: this.configService.getSecretKey,
          grant_type: 'authorization_code',
          code: this.configService.getAuthCode,
          redirect_uri: this.configService.getHost,
        };
    
        const { data } = await this.httpService.post(`${this.configService.getAmoCrmHost}/oauth2/access_token`, tokenRequest).toPromise();
    
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        const now = new Date();
        this.expireTokenAt = new Date(now.getTime() + data.expiresIn * 1000);
      } catch (e) {
        console.error(e)
      }
    }

    async getAccessToken(): Promise<string> {
        // Проверяем инициализированы ли наши токены
        if (!this.accessToken && !this.refreshToken) {
          await this.initializeTokens();
        }
        // Проверяем срок действия и обновляем, если необходимо
        if (this.accessToken && this.isTokenExpired()) {
          await this.refreshAccessToken();
        }
    
        return this.accessToken;
    }
    
    private isTokenExpired(): boolean {
        if (!this.expireTokenAt) {
          // Если время истечения не установлено, считаем токен истекшим
          return true;
        }
    
        const now = new Date();
        return now >= this.expireTokenAt;
    }

    private async refreshAccessToken(): Promise<void> {
        try {
          const refreshRequest = {
            client_id: this.configService.getIntegrationId,
            client_secret: this.configService.getSecretKey,
            grant_type: 'refresh_token',
            refresh_token: this.refreshToken,
            redirect_uri: this.configService.getHost,
          };
      
          const { data } = await this.httpService.post(`${this.configService.getAmoCrmHost}/oauth2/access_token`, refreshRequest).toPromise();
      
          this.accessToken = data.access_token;
          this.refreshToken = data.refresh_token;
          const now = new Date();
          this.expireTokenAt = new Date(now.getTime() + data.expiresIn * 1000);
        } catch (e) {
          console.error(e);
        }
    }
}