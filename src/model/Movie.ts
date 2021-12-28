import mongoose, { Document, Model } from 'mongoose';

const MovieSchema = new mongoose.Schema<IMovie, MovieModel>(
  {
    title: String,
    year: Number,
    runtime: String,
    released: String,
    metacritic: String,
    poster: String,
    plot: String,
    awards: [String],
    type: String,
    directors: [String],
    actors: [String],
    writers: [String],
    genres: [String],
    languages: [String],
    countries: [String],
    fullPlot: String,
    rated: String,
    imdb: {
      id: Number,
      rating: Number,
      votes: Number,
    },
    lastUpdate: Date,
    totalRating: Number,
    averageRating: {
      type: Number,
      required: [true, 'Must have value for rating'],
      min: [1, 'Rating must be greater than or equal to 1'],
      max: [10, 'Rating must be less than or equal to 10'],
    },
  },
  { timestamps: true, collection: 'movies' }
);

export interface IMovie extends Document {
  _id: string;
  title: string;
  year: number;
  runtime: string;
  released: string;
  metacritic: string;
  poster: string;
  plot: string;
  awards: string;
  type: string;
  directors: string[];
  actors: string[];
  writers: string[];
  genres: string[];
  languages: string[];
  countries: string[];
  fullPlot: string;
  rated: string;
  imdb: Imdb;
  lastUpdate: Date;
}

export interface Imdb {
  id: number;
  rating: number;
  votes: number;
}

export interface MovieModel extends Model<IMovie> {}

const Movie = mongoose.model<Document & MovieModel>('Movie', MovieSchema);

export default Movie;
