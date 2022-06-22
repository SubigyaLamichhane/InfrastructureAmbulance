import { User } from '../../entities/User';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import argon2 from 'argon2';
import { MyContext } from '../../types';
import { UserInput } from './UserInput';
import { UserResponse } from './UserResponse';

@Resolver(User)
export class UserResolver {
  @Query(() => Boolean)
  async doesEmailExist(@Arg('email') email: string) {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return true;
    }
    return false;
  }

  @Query(() => Boolean)
  async doesUsernameExist(@Arg('username') username: string) {
    const user = await User.findOne({ where: { username } });
    if (user) {
      return true;
    }
    return false;
  }

  @Query(() => Boolean)
  async phoneNumberVerification(
    @Arg('phone-number', () => Int) phoneNumber: number
  ) {
    const user = await User.findOne({ where: { phonenumber: phoneNumber } });
    if (user) {
      return true;
    }

    return false;
  }

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
        error: true,
      };
    }
    user = await User.findOne({
      where: { username: input.username },
    });
    if (user) {
      return {
        error: true,
      };
    }
    user = await User.findOne({
      where: { email: input.email },
    });
    if (user) {
      return {
        error: true,
      };
    }
    const verificationCode = await redis.get(input.phoneNumber.toString());
    if (verificationCode) {
      if (input.verificationCode === parseInt(verificationCode)) {
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
        });
        return {
          user: user,
        };
      }
    }
    return {
      error: true,
    };
  }
}
