import { Request } from 'express';
import { TokenService } from './services';
import { GetCustomerInfoDto } from './@types/dto';
import { AmoCrmApiService } from './services/amo-crm-api.service';
export declare class AppController {
    private readonly tokenService;
    private readonly amoCrmApiService;
    constructor(tokenService: TokenService, amoCrmApiService: AmoCrmApiService);
    getHello(req: Request): Promise<object>;
    getCustomerInfo(dto: GetCustomerInfoDto): Promise<object>;
}
