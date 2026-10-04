import { IsString, IsNumber, Min, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  address!: string;

  @IsNumber()
  @Min(0)
  totalPrice!: number;

  @IsArray()
  items!: Array<{ productId: string; quantity: number }>;
}
