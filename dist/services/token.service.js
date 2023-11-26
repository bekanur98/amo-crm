"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const env_config_service_1 = require("../helper/env-config/env-config.service");
let TokenService = class TokenService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        this.expireTokenAt = null;
    }
    async initializeTokens() {
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
        }
        catch (e) {
            console.error(e);
        }
    }
    async getAccessToken() {
        if (!this.accessToken && !this.refreshToken) {
            await this.initializeTokens();
        }
        if (this.accessToken && this.isTokenExpired()) {
            await this.refreshAccessToken();
        }
        return this.accessToken;
    }
    isTokenExpired() {
        if (!this.expireTokenAt) {
            return true;
        }
        const now = new Date();
        return now >= this.expireTokenAt;
    }
    async refreshAccessToken() {
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
        }
        catch (e) {
            console.error(e);
        }
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [env_config_service_1.EnvConfigService,
        axios_1.HttpService])
], TokenService);
//# sourceMappingURL=token.service.js.map