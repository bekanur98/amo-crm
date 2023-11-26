import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  get getNodeEnv(): string {
    return this.configService.get<string>("NODE_ENV");
  }

  get getHost(): string {
    return this.configService.get<string>("HOST");
  }

  get getSecretKey(): string {
    return this.configService.get<string>("SECRET_KEY");
  }

  get getIntegrationId(): string {
    return this.configService.get<string>("INTEGRATION_ID");
  }

  get getAuthCode(): string {
    return this.configService.get<string>("AUTH_CODE");
  }

  get getAmoCrmHost(): string {
    return this.configService.get<string>("AMO_CRM_HOST");
  }
}