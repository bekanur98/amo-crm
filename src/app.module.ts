import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { EnvConfigModule } from './helper';
import { TokenService } from './services';
import { AmoCrmApiService } from './services/amo-crm-api.service';

@Module({
  imports: [
    HttpModule,
    EnvConfigModule.register({
      envFilePath: "./env/local.env",
    }),
  ],
  controllers: [AppController],
  providers: [TokenService, AmoCrmApiService],
})
export class AppModule {}
