import { ConfigService } from "@nestjs/config";
export declare class EnvConfigService {
    private readonly configService;
    constructor(configService: ConfigService);
    get getNodeEnv(): string;
    get getHost(): string;
    get getSecretKey(): string;
    get getIntegrationId(): string;
    get getAuthCode(): string;
    get getAmoCrmHost(): string;
}
