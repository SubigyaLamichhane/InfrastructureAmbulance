import { MyContext } from 'src/types';
import { isAuth } from '../utils/middleware/isAuth';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Complain } from '../entities/Complain';
import { dataSource } from '../dataSource';

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@ObjectType()
class PaginatedComplains {
  @Field(() => [Complain])
  posts: Complain[];

  @Field()
  hasMore: boolean;
}

@Resolver(Complain)
export class ComplainResolver {
  @FieldResolver()
  textSnippet(@Root() root: Complain): String {
    return root.description.slice(0, 50);
  }

  @Query(() => PaginatedComplains)
  async Complains(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedComplains> {
    const realLimit = limit >= 50 ? 50 : limit;
    const realLimitPlusOne = realLimit + 1;

    // const replacements: any[] = [realLimitPlusOne];

    // if (cursor) {
    //   replacements.push(new Date(parseInt(cursor)));
    // }

    // const Complains = await dataSource.query(
    //   `
    //   select p.*,
    //   json_build_object(
    //     'id', u.id,
    //     'username', u.username,
    //     'email', u.email,
    //     'createdAt', u."createdAt",
    //     'updatedAt', u."updatedAt",
    //     ) creator
    //   from Complain p
    //   inner join public.user u on u.id = p."creatorId"
    //   ${cursor ? 'where p."createdAt" < $2' : ''}
    //   order by p."createdAt" DESC
    //   limit $1
    // `,
    //   replacements
    // );

    const complain = dataSource
      .getRepository(Complain)
      .createQueryBuilder('p')
      //.innerJoinAndSelect('p.creator', 'u', 'u.id = p."creatorId"')
      .orderBy('"createdAt"', 'DESC') // if we dont put double quotes the A will be lowecased and error
      .take(realLimitPlusOne);
    if (cursor) {
      complain.where('p."createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const complains = await complain.getMany();

    const complainsWithHasMore = {
      posts: complains.slice(0, realLimit),
      hasMore: complains.length === realLimitPlusOne,
    };

    return complainsWithHasMore;
  }

  @Query(() => Complain, { nullable: true })
  post(@Arg('id') id: number): Promise<Complain | null> {
    return Complain.findOne({ where: { id } });
  }

  @Mutation(() => Complain)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('input') input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Complain> {
    const post = await Complain.create({
      ...input,
      creatorId: req.session.userId,
    }).save();

    return post;
  }

  @Mutation(() => Complain, { nullable: true })
  async updatePost(
    @Arg('id', () => Int) id: number,
    @Arg('title', () => String, { nullable: true }) title: string
  ): Promise<Complain | null> {
    const post = await Complain.findOne({ where: { id } });
    if (!post) {
      return null;
    }
    if (typeof title !== 'undefined') {
      await Complain.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id') id: number): Promise<boolean> {
    try {
      await Complain.delete(id);
    } catch {
      return false;
    }
    return true;
  }
}
