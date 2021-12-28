import mongoose, { Document, Model, Schema } from 'mongoose';
import Movie from '../model/Movie';

const RatingSchema = new mongoose.Schema<IRating, RatingModel>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
    },
    rating: {
      type: Number,
      required: [true, 'Must have value for rating'],
      min: [1, 'Rating must be greater than or equal to 1'],
      max: [10, 'Rating must be less than or equal to 10'],
    },
  },
  { timestamps: true }
);

export interface IRating extends Document {
  body: string;
  author: string;
  movie: string;
}

export interface RatingModel extends Model<IRating> {}

RatingSchema.statics.calcAverageRating = async function (rating: any) {
  const stats = await this.aggregate([
    { $match: { movie: rating.movie } },
    {
      $group: {
        _id: '$movie',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  await Movie.findByIdAndUpdate(
    { _id: rating.movie },
    {
      totalRating: stats[0].nRating,
      averageRating: stats[0].avgRating.toFixed(2),
    }
  );
};

RatingSchema.post('save', function (next) {
  // @ts-ignore
  this.constructor.calcAverageRating(this);
});

RatingSchema.pre(/^findOneAnd/, async function (next) {
  // @ts-ignore
  this.query = await this.findOne();
  // @ts-ignore
  next();
});

RatingSchema.post(/^findOneAnd/, async function (next) {
  // @ts-ignore
  const ratingObject = this?.query ?? '';
  // @ts-ignore
  await this.query.constructor.calcAverageRating(ratingObject);
});

const Rating = mongoose.model<Document & RatingModel>('Rating', RatingSchema);

export default Rating;
