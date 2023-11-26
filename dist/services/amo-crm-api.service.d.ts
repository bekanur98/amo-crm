import { TokenService } from "./token.service";
import { EnvConfigService } from "src/helper";
import { GetCustomerInfoDto } from "src/@types/dto";
import { HttpService } from "@nestjs/axios";
export declare class AmoCrmApiService {
    private readonly tokenService;
    private readonly configService;
    private httpService;
    constructor(tokenService: TokenService, configService: EnvConfigService, httpService: HttpService);
    createCustomerDeal(dto: GetCustomerInfoDto): Promise<void>;
    findCustomer(dto: GetCustomerInfoDto): Promise<any>;
    updateCustomer(customer: any, dto: GetCustomerInfoDto): Promise<any>;
    createCustomer(dto: GetCustomerInfoDto): Promise<any>;
    createDeal(customer: any): Promise<void>;
}
