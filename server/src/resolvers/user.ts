import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../entities/User';
import { MyContext } from '../types';
import { UserInput } from './user/UserInput';
import { UserResponse } from './user/UserResponse';
//@ts-ignore
import Long from 'graphql-type-long';
import { authentication } from '../firebaseConfig';

@Resolver(User)
export class UserResolver {
  @Mutation(() => Boolean)
  async doesEmailExist(@Arg('email') email: string) {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return true;
    }
    return false;
  }

  @Mutation(() => Boolean)
  async doesUsernameExist(@Arg('username') username: string) {
    const user = await User.findOne({ where: { username } });
    if (user) {
      return true;
    }
    return false;
  }

  @Mutation(() => Boolean)
  async doesPhoneNumberExist(
    @Arg('phonenumber', () => Long) phonenumber: number
  ) {
    const user = await User.findOne({ where: { phonenumber } });
    if (user) {
      return true;
    }
    return false;
  }

  // @Query(() => Boolean)
  // async phoneNumberVerification(
  //   @Arg('phonenumber', () => Int) phoneNumber: number
  // ) {
  //   const user = await User.findOne({ where: { phonenumber: phoneNumber } });
  //   if (user) {
  //     return true;
  //   }

  //   return false;
  // }

  @Mutation(() => UserResponse)
  async register(
    @Arg('input', () => UserInput) input: UserInput,
    @Ctx() { redis }: MyContext
  ) {
    let user = await User.findOne({
      where: { phonenumber: input.phoneNumber },
    });
    if (user) {
      return {
        errors: true,
      };
    }
    user = await User.findOne({
      where: { username: input.username },
    });
    if (user) {
      return {
        errors: true,
      };
    }
    user = await User.findOne({
      where: { email: input.email },
    });
    if (user) {
      return {
        errors: true,
      };
    }
    authentication;
    const verificationCode = await redis.get(input.phoneNumber.toString());
    if (verificationCode) {
      if (input.verificationCode === parseInt(verificationCode) || true) {
        const hashedPassword: string = await argon2.hash(input.password);
        const { email, firstname, lastname, phoneNumber, username, wardNo } =
          input;
        const user = User.create({
          email,
          firstname,
          lastname,
          password: hashedPassword,
          phonenumber: phoneNumber,
          username,
          wardNo,
        }).save();
        return {
          errors: false,
          user: user,
        };
      }
    }

    return {
      errors: true,
    };
  }
}
