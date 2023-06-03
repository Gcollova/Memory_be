import { UserModel } from '../models/user.model';

export async function scoreGET(userID: string) {
  try {
    const user = await UserModel.findById(userID).select('nickName _id score');
    const users = await UserModel.find().sort({ score: -1 });
    const userIndex = (userID: string) => users.findIndex((u) => u._id === userID);

    if (!user) {
      return { status: 'ko', content: 'User not Found' };
    }
    user.position = userIndex(user._id) + 1;

    const [prevUsers, nextUsers] = await Promise.all([
      UserModel.aggregate([
        { $match: { score: { $lte: user?.score }, _id: { $ne: user?._id } } },
        { $sort: { score: -1 } },
        { $limit: 3 },
      ]),
      UserModel.aggregate([
        { $match: { score: { $gt: user?.score }, _id: { $ne: user?._id } } },
        { $sort: { score: 1 } },
        { $limit: 3 },
      ]),
    ]);

    const userData = {
      user,
      prevUsers: prevUsers.map((el) => {
        return { ...el, position: userIndex(el._id) + 1 };
      }),
      nextUsers: nextUsers.map((el) => {
        return { ...el, position: userIndex(el._id) + 1 };
      }),
    };

    return { status: 'ok', content: userData };
  } catch (error) {
    return { status: 'ko', content: error };
  }
}
