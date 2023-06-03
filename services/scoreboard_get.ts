import { UserModel } from '../models/user.model';

export async function scoreboardGET(page: number) {
  const collectionExists = await UserModel.exists({});
  if (!collectionExists) {
    return { status: 'ok', content: { users: [], totalPages: 0, currentPage: 0 } };
  }
  const limit = 10;

  const totalUsersCount = await UserModel.countDocuments();

  const totalPages = Math.ceil(totalUsersCount / limit);

  const skip = (page - 1) * limit;

  if (page > totalPages) {
    return { status: 'ko', content: 'Page not Found' };
  }

  try {
    const users = await UserModel.find({}, 'nickName _id score').sort({ score: -1 }).skip(skip).limit(limit);

    return { status: 'ok', content: { users, totalPages, currentPage: page } };
  } catch (error) {
    return { status: 'ko', content: error };
  }
}
