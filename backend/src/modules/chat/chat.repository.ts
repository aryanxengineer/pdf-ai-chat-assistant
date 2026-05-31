import { ChatModel } from "./chat.model.js";

export class ChatRepository {
  constructor() {}

  create = async (data: any) => {
    return await ChatModel.create(data);
  };

  fetchHistory = async (userId: string) => {
    return await ChatModel.find({ userId }).sort({ createdAt: -1 }).limit(20);
  };
}
