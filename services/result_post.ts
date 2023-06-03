import { UserCreate, UserModel } from './../models/user.model';
import { scoreGET } from './score_get';

export async function resultPOST(user: UserCreate) {
  try {
    const created = await UserModel.create(user);
    await created.save();
    const result = await scoreGET(user._id!);
    return result;
  } catch (error) {
    return { status: 'ko', content: error };
  }
}
