import { Router } from 'express';
const router = Router();
import {
  deleteCustomCategory,
  getProfile,
  updateCustomCategory,
} from './controller';

router.route('/profile').get(getProfile);
router.route('/updateCustomCategory').put(updateCustomCategory);
router.route('/deleteCustomCategory').put(deleteCustomCategory);

export default router;
