import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ timestamps: true, _id: true })
export class UserModel {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
