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
exports.EnvConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let EnvConfigService = class EnvConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get getNodeEnv() {
        return this.configService.get("NODE_ENV");
    }
    get getHost() {
        return this.configService.get("HOST");
    }
    get getSecretKey() {
        return this.configService.get("SECRET_KEY");
    }
    get getIntegrationId() {
        return this.configService.get("INTEGRATION_ID");
    }
    get getAuthCode() {
        return this.configService.get("AUTH_CODE");
    }
    get getAmoCrmHost() {
        return this.configService.get("AMO_CRM_HOST");
    }
};
exports.EnvConfigService = EnvConfigService;
exports.EnvConfigService = EnvConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EnvConfigService);
//# sourceMappingURL=env-config.service.js.map