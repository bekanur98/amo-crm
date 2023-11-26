"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EnvConfigModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const env_config_service_1 = require("./env-config.service");
let EnvConfigModule = EnvConfigModule_1 = class EnvConfigModule {
    static register(options) {
        return {
            module: EnvConfigModule_1,
            imports: [config_1.ConfigModule.forRoot(options)],
            providers: [env_config_service_1.EnvConfigService],
            exports: [env_config_service_1.EnvConfigService],
        };
    }
};
exports.EnvConfigModule = EnvConfigModule;
exports.EnvConfigModule = EnvConfigModule = EnvConfigModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], EnvConfigModule);
//# sourceMappingURL=env-config.module.js.map