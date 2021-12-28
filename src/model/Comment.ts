import mongoose, { Document, Model, Schema } from 'mongoose';

const CommentSchema = new mongoose.Schema<IComment, CommentModel>(
  {
    body: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
    },
  },
  { timestamps: true }
);

export interface IComment extends Document {
  body: string;
  author: string;
  movie: string;
}

export interface CommentModel extends Model<IComment> {}

const Comment = mongoose.model<Document & CommentModel>(
  'Comment',
  CommentSchema
);

export default Comment;
