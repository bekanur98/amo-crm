import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigModuleOptions } from "@nestjs/config";
import { EnvConfigService } from "./env-config.service";


@Global()
@Module({})
export class EnvConfigModule {
  static register(options: ConfigModuleOptions): DynamicModule {
    return {
      module: EnvConfigModule,
      imports: [ConfigModule.forRoot(options)],
      providers: [EnvConfigService],
      exports: [EnvConfigService],
    };
  }
}