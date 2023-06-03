import { IsString, IsNumber, IsOptional, IsInt, Min, Max } from 'class-validator';
import { MaxLength, MinLength } from 'class-validator';
import { model, Model, Schema } from 'mongoose';

export class User {
  _id?: string;
  nickName?: string;
  time?: number;
  score?: number;
  position?: number;
}

// Model for creating item in database.
export type UserCreate = Pick<User, 'nickName' | '_id' | 'score' | 'position' | 'time'>;

export class UserCreateAPI implements Pick<User, 'nickName' | '_id' | 'score'> {
  @IsString()
  @MaxLength(12)
  @MinLength(2)
  nickName?: string;

  @IsString()
  @IsOptional()
  _id?: string;

  @IsInt()
  @Max(90)
  @Min(1)
  time?: number;
}

const UserSchema = new Schema<User>(
  {
    _id: { type: String, required: false },
    nickName: { type: String, required: true },
    score: { type: Number, required: true },
    position: { type: Number, required: false },
  },
  { collection: 'user', timestamps: true }
);

export const UserModel: Model<User> = model('user', UserSchema);
