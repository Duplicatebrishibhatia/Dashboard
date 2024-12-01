import express from 'express';
import { validateItem } from '../middleware/validation';
import {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/items.ts';

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', validateItem, createItem);
router.put('/:id', validateItem, updateItem);
router.delete('/:id', deleteItem);

export default router; 