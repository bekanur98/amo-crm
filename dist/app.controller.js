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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("./services");
const dto_1 = require("./@types/dto");
const amo_crm_api_service_1 = require("./services/amo-crm-api.service");
let AppController = class AppController {
    constructor(tokenService, amoCrmApiService) {
        this.tokenService = tokenService;
        this.amoCrmApiService = amoCrmApiService;
    }
    async getHello(req) {
        try {
            await this.tokenService.initializeTokens();
            return { success: true };
        }
        catch (e) {
            return { success: false, message: e.message };
        }
    }
    async getCustomerInfo(dto) {
        try {
            const data = await this.amoCrmApiService.createCustomerDeal(dto);
            return { success: true, data };
        }
        catch (e) {
            return { success: false, message: e.message };
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)("/customers"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GetCustomerInfoDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCustomerInfo", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [services_1.TokenService,
        amo_crm_api_service_1.AmoCrmApiService])
], AppController);
//# sourceMappingURL=app.controller.js.map