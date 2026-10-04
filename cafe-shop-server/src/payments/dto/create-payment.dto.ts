import {
  IsNumber,
  IsString,
  Min,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @Min(1)
  amount!: number;

  @IsString()
  @IsOptional()
  @MaxLength(128)
  description?: string;

  @IsString()
  @IsOptional()
  orderId?: string;
}
