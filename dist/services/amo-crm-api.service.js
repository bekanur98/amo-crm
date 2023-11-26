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
exports.AmoCrmApiService = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("./token.service");
const helper_1 = require("../helper");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AmoCrmApiService = class AmoCrmApiService {
    constructor(tokenService, configService, httpService) {
        this.tokenService = tokenService;
        this.configService = configService;
        this.httpService = httpService;
    }
    async createCustomerDeal(dto) {
        let customer = await this.findCustomer(dto);
        if (customer === null) {
        }
        else {
            await this.updateCustomer(customer, dto);
        }
        await this.createDeal(customer);
    }
    async findCustomer(dto) {
        try {
            const { data, status } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.configService.getAmoCrmHost}/api/v4/contacts?query=${dto.email} ${dto.phone}`, {
                headers: {
                    Authorization: `Bearer ${this.tokenService.getAccessToken}`
                }
            }).pipe((0, rxjs_1.catchError)((error) => {
                console.error(error.response.data);
                throw 'An error happened!';
            })));
            if (status === 200) {
                return data._embedded.contacts[0];
            }
            else if (status === 204) {
                return null;
            }
            else {
                console.error("something went wrong");
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    async updateCustomer(customer, dto) {
        try {
            const parts = dto.name.split(" ");
            customer.first_name = parts[0];
            customer.last_name = parts[1] !== undefined ? parts[1] : customer.last_name;
            const { data } = await this.httpService.patch(`${this.configService.getAmoCrmHost}/api/v4/contacts/${customer.id}`, customer, {
                headers: {
                    Authorization: `Bearer ${this.tokenService.getAccessToken}`
                }
            }).toPromise();
            return data;
        }
        catch (e) {
            console.error(e);
        }
    }
    async createCustomer(dto) {
        try {
            const customer = {
                name: dto.name,
                custom_fields_values: [
                    {
                        field_id: 59013,
                        field_name: "Телефон",
                        field_code: "PHONE",
                        field_type: "multitext",
                        values: [
                            {
                                value: dto.phone,
                                enum_id: 29859,
                                enum_code: "WORK"
                            }
                        ]
                    },
                    {
                        field_id: 59015,
                        field_name: "Email",
                        field_code: "EMAIL",
                        field_type: "multitext",
                        values: [
                            {
                                value: dto.email,
                                enum_id: 29871,
                                enum_code: "WORK"
                            }
                        ]
                    }
                ]
            };
            const { data } = await this.httpService.post(`${this.configService.getAmoCrmHost}/api/v4/contacts`, { data: customer }, {
                headers: {
                    Authorization: `Bearer ${this.tokenService.getAccessToken}`
                }
            }).toPromise();
            return data;
        }
        catch (e) {
            console.error(e);
        }
    }
    async createDeal(customer) {
        try {
            const deal = [
                {
                    name: "Сделка для примера 1",
                    price: 10000,
                    _embedded: {
                        contacts: [
                            {
                                id: customer.id
                            }
                        ]
                    }
                }
            ];
            const { data } = await this.httpService.post(`${this.configService.getAmoCrmHost}/api/v4/leads`, deal, {
                headers: {
                    Authorization: `Bearer ${this.tokenService.getAccessToken}`
                }
            }).toPromise();
        }
        catch (e) {
            console.error(e);
        }
    }
};
exports.AmoCrmApiService = AmoCrmApiService;
exports.AmoCrmApiService = AmoCrmApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenService,
        helper_1.EnvConfigService,
        axios_1.HttpService])
], AmoCrmApiService);
//# sourceMappingURL=amo-crm-api.service.js.map