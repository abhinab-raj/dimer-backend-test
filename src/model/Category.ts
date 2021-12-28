import mongoose, { Document, Model } from 'mongoose';

const TransactionSchema = new mongoose.Schema<ITransaction, TransactionModel>(
  {
    title: String,
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
