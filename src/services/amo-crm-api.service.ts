import { Injectable } from "@nestjs/common";
import { TokenService } from "./token.service";
import { EnvConfigService } from "src/helper";
import { GetCustomerInfoDto } from "src/@types/dto";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";

@Injectable()
export class AmoCrmApiService {
    constructor(
        private readonly tokenService: TokenService,
        private readonly configService: EnvConfigService,
        private httpService: HttpService,
    ) {}

    async createCustomerDeal(dto: GetCustomerInfoDto) {
        let customer = await this.findCustomer(dto);
        
        if (customer === null) {
            // customer = await this.createCustomer(dto);
        } else {
            await this.updateCustomer(customer, dto)
        }

        await this.createDeal(customer);

    }

    public async findCustomer(dto: GetCustomerInfoDto) {
        try {
            const { data, status } = await firstValueFrom(
                this.httpService.get<any>(
                    `${this.configService.getAmoCrmHost}/api/v4/contacts?query=${dto.email} ${dto.phone}`,
                    {
                        headers: {
                            Authorization: `Bearer ${this.tokenService.getAccessToken}`
                        }
                    }
                    ).pipe(
                  catchError((error: AxiosError) => {
                    console.error(error.response.data);
                    throw 'An error happened!';
                  }),
                ),
              );
              
            if (status === 200) {
                //возвращаем первый подходящий контакт, так как в ТЗ написано, что надо найти контакт а не контакты
                return data._embedded.contacts[0];
            } else if (status === 204) {
                //204 такого контакта нету
                return null;
            } else {
                console.error("something went wrong")
            }
          } catch (e) {
            console.error(e);
          }
    }

    async updateCustomer(customer: any, dto: GetCustomerInfoDto) {
        try {
            const parts = dto.name.split(" ");
            customer.first_name = parts[0];
            customer.last_name = parts[1] !== undefined ? parts[1] : customer.last_name

            const { data } = await this.httpService.patch(
                `${this.configService.getAmoCrmHost}/api/v4/contacts/${customer.id}`, 
                customer,
                {
                    headers: {
                        Authorization: `Bearer ${this.tokenService.getAccessToken}`
                    }
                }
                ).toPromise();
            return data;
        } catch (e) {
            console.error(e);
        }
    }

    async createCustomer(dto: GetCustomerInfoDto) {
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

            const { data } = await this.httpService.post(
                `${this.configService.getAmoCrmHost}/api/v4/contacts`, 
                {data: customer},
                {
                    headers: {
                        Authorization: `Bearer ${this.tokenService.getAccessToken}`
                    }
                }
                ).toPromise();
            return data;
        } catch (e) {
            console.error(e);
        }
    }

    async createDeal(customer: any) {
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
            ]
    
            const { data } = await this.httpService.post(
                `${this.configService.getAmoCrmHost}/api/v4/leads`, 
                deal,
                {
                    headers: {
                        Authorization: `Bearer ${this.tokenService.getAccessToken}`
                    }
                }
                ).toPromise();
        } catch (e) {
            console.error(e)
        }
    }
}