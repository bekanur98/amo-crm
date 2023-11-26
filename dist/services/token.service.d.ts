import { HttpService } from "@nestjs/axios";
import { EnvConfigService } from "src/helper/env-config/env-config.service";
export declare class TokenService {
    private readonly configService;
    private httpService;
    private accessToken;
    private refreshToken;
    private expireTokenAt;
    constructor(configService: EnvConfigService, httpService: HttpService);
    initializeTokens(): Promise<void>;
    getAccessToken(): Promise<string>;
    private isTokenExpired;
    private refreshAccessToken;
}
