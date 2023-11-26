import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from './services';
import { EnvConfigService } from './helper/env-config';
import { GetCustomerInfoDto } from './@types/dto';
import { AmoCrmApiService } from './services/amo-crm-api.service';

@Controller()
export class AppController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly amoCrmApiService: AmoCrmApiService,
  ) {
  }

  @Get()
  async getHello(@Req() req: Request): Promise<object> {
    try {
      await this.tokenService.initializeTokens();

      return {success: true}
    } catch (e) {
      return {success: false, message: e.message};
    }
  }

  @Get("/customers")
  async getCustomerInfo(
    @Query()dto: GetCustomerInfoDto
  ): Promise<object> {
    try {
      const data = await this.amoCrmApiService.createCustomerDeal(dto);
      return {success: true, data }
    } catch (e) {
      return {success: false, message: e.message};
    }
  }
}
