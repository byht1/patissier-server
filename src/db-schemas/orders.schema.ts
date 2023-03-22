import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Users } from 'src/db-schemas/users.schema';
import { Stor } from 'src/db-schemas/stor.schema';

export type OrdersDocument = Orders & Document;

export enum EDelivery {
  DELIVERY = 'Доставка',
  PICKUP = 'Самовивіз',
}

export enum EContactTime {
  SOON = 'Найближчий час',
  SCHEDULED = 'У вказаний час',
}

export enum EPayment {
  UPON_RECEIPT = 'При отриманні',
  ONLINE = 'На сайті',
}

class ContactTime {
  @ApiProperty({
    example: 'Найближчий час',
  })
  contactTimeString: EContactTime;

  @ApiProperty({
    example: '2023-03-22 19:00',
  })
  date?: string;
}

@Schema({ versionKey: false, timestamps: true })
export class Orders {
  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ example: 'ПІБ' })
  @Prop({ type: String, required: true })
  fullName: string;

  @ApiProperty({ example: '+380501234567' })
  @Prop({ type: String, required: true })
  phone: string;

  @ApiProperty({ example: 'Коментар до замовлення' })
  @Prop({ type: String, default: '' })
  orderComment?: string;

  @ApiProperty({ example: `Спосіб доставки ${Object.values(EDelivery).join(', ')}` })
  @Prop({ type: String, enum: Object.values(EDelivery), required: true })
  typeDelivery: EDelivery;

  @ApiProperty({ example: 'Адреса доставки' })
  @Prop({ type: String, required: true })
  deliveryAddress: string;

  @ApiProperty({ type: ContactTime })
  @Prop({
    type: {
      contactTime: {
        contactTimeString: {
          type: String,
          enum: Object.values(EContactTime),
          required: true,
        },
        date: {
          type: String,
          default: null,
        },
      },
    },
  })
  contactTime: {
    contactTimeString: EContactTime;
    date: string;
  };

  @ApiProperty({ example: 'Тип оплати' })
  @Prop({ type: String, enum: Object.values(EPayment), required: true })
  payment: EPayment;

  @ApiProperty({ example: 'Загальна ціна замовлення' })
  @Prop({ type: Number, required: true })
  totalPrise: number;

  @ApiProperty({ example: '6373c0bca5a6e4c9556f1e7a' })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    required: true,
  })
  owner: Users;

  @ApiProperty({ example: ['6373c0bca5a6e4c9556f1e7a'] })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stor' }],
    required: true,
  })
  products: Stor[];
}

export type OrdersColumnName = keyof Orders;

export const OrdersSchema = SchemaFactory.createForClass(Orders);
