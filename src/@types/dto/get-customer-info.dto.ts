import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class GetCustomerInfoDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;
}