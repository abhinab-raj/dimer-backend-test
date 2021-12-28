import { Express } from 'express';
import verifyAuth from '../middleware/verifyAuth';
import AuthRoutes from './auth';
import TransactionRoutes from './transaction';
import AnalyticsRoutes from './analytics';
import UserRoutes from './user';

const BASE_PATH = '/api';

const routes = (app: Express) => {
  app.use(`${BASE_PATH}/auth`, AuthRoutes);
  app.use(`${BASE_PATH}/transaction`, verifyAuth, TransactionRoutes);
  app.use(`${BASE_PATH}/analytics`, verifyAuth, AnalyticsRoutes);
  app.use(`${BASE_PATH}/user`, verifyAuth, UserRoutes);
};

export default routes;
