import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDeckDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsNumber()
  @IsOptional()
  user: number;
}
