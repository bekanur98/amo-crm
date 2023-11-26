import { DynamicModule } from "@nestjs/common";
import { ConfigModuleOptions } from "@nestjs/config";
export declare class EnvConfigModule {
    static register(options: ConfigModuleOptions): DynamicModule;
}
