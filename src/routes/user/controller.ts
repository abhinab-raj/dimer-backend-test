import { Request, Response } from 'express';
import User from '../../model/User';
import { IUser } from '../../model/User';
import { handleError, handleSuccess } from '../../utils/handleResponse';

export const getProfile = async (
  request: Request & { currentUser: IUser },
  response: Response
) => {
  const { currentUser } = request;
  const user: any = await User.findOne({ email: currentUser.email }).catch(
    (err) => handleError(response, err)
  );
  return handleSuccess(response, { profile: user });
};

export const updateCustomCategory = async (
  request: Request & { currentUser: IUser },
  response: Response
) => {
  const {
    currentUser,
    body: { category },
  } = request;
  const user: any = await User.findByIdAndUpdate(
    { _id: currentUser._id },
    { $push: { customCategory: category } },
    { new: true }
  ).catch((err) => handleError(response, err));
  console.log(user, '@user');
  return handleSuccess(response, [...user.customCategory]);
};

export const deleteCustomCategory = async (
  request: Request & { currentUser: IUser },
  response: Response
) => {
  const {
    currentUser,
    body: { category },
  } = request;
  const user: any = await User.findByIdAndUpdate(
    { _id: currentUser._id },
    { $pull: { customCategory: category } },
    { new: true }
  ).catch((err) => handleError(response, err));
  console.log(user, '@user');
  return handleSuccess(response, [...user.customCategory]);
};
