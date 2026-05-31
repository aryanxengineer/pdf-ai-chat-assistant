import { Router } from 'express';
import authRoutes from '@modules/auth/auth.routes.js';
import userRoutes from '@modules/user/user.routes.js';
import documentRoutes from '@modules/document/document.routes.js';
import chatRoutes from '@modules/chat/chat.routes.js';

const indexRouter = Router();

indexRouter.use('/auth', authRoutes);
indexRouter.use('/users', userRoutes);
indexRouter.use('/documents', documentRoutes);
indexRouter.use('/chats', chatRoutes);

export default indexRouter;