import { Router } from 'express';
import { getChatGroups, getMessagesByGroup, sendMessage } from '../controllers/messagesController';

const router = Router();

router.get('/groups', getChatGroups);
router.get('/:groupId', getMessagesByGroup);
router.post('/', sendMessage);

export default router;
