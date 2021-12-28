import mongoose, { Document, Model, Schema } from 'mongoose';

const TransactionSchema = new mongoose.Schema<ITransaction, TransactionModel>(
  {
    title: String,
    amount: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    category: String,
    type: String,
  },
  { timestamps: true }
);

export interface ITransaction extends Document {
  title: string;
  amount: number;
  type: 'EXPENSE' | 'INCOME';
  category: string;
  user: string;
}

export interface TransactionModel extends Model<ITransaction> {}

const Transaction = mongoose.model<Document & TransactionModel>(
  'Transaction',
  TransactionSchema
);

export default Transaction;
