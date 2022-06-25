import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
};

export type Complain = {
  __typename?: 'Complain';
  category: Scalars['String'];
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Float'];
  description: Scalars['String'];
  id: Scalars['Int'];
  langitude: Scalars['Int'];
  latitude: Scalars['Int'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  wardNo: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Complain;
  deletePost: Scalars['Boolean'];
  doesEmailExist: Scalars['Boolean'];
  doesPhoneNumberExist: Scalars['Boolean'];
  doesUsernameExist: Scalars['Boolean'];
  register: UserResponse;
  updatePost?: Maybe<Complain>;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationDoesEmailExistArgs = {
  email: Scalars['String'];
};


export type MutationDoesPhoneNumberExistArgs = {
  phonenumber: Scalars['Long'];
};


export type MutationDoesUsernameExistArgs = {
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: UserInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};

export type PaginatedComplains = {
  __typename?: 'PaginatedComplains';
  hasMore: Scalars['Boolean'];
  posts: Array<Complain>;
};

export type PostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  Complains: PaginatedComplains;
  phoneNumberVerification: Scalars['Boolean'];
  post?: Maybe<Complain>;
};


export type QueryComplainsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPhoneNumberVerificationArgs = {
  phonenumber: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
  lastname: Scalars['String'];
  phonenumber: Scalars['Long'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
  wardNo: Scalars['Int'];
};

export type UserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['Long'];
  username: Scalars['String'];
  verificationCode: Scalars['Int'];
  wardNo: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type DoesEmailExistMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type DoesEmailExistMutation = { __typename?: 'Mutation', doesEmailExist: boolean };

export type DoesPhoneNumberExistMutationVariables = Exact<{
  phonenumber: Scalars['Long'];
}>;


export type DoesPhoneNumberExistMutation = { __typename?: 'Mutation', doesPhoneNumberExist: boolean };

export type DoesUsernameExistMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type DoesUsernameExistMutation = { __typename?: 'Mutation', doesUsernameExist: boolean };


export const DoesEmailExistDocument = gql`
    mutation DoesEmailExist($email: String!) {
  doesEmailExist(email: $email)
}
    `;
export type DoesEmailExistMutationFn = Apollo.MutationFunction<DoesEmailExistMutation, DoesEmailExistMutationVariables>;

/**
 * __useDoesEmailExistMutation__
 *
 * To run a mutation, you first call `useDoesEmailExistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoesEmailExistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doesEmailExistMutation, { data, loading, error }] = useDoesEmailExistMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDoesEmailExistMutation(baseOptions?: Apollo.MutationHookOptions<DoesEmailExistMutation, DoesEmailExistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoesEmailExistMutation, DoesEmailExistMutationVariables>(DoesEmailExistDocument, options);
      }
export type DoesEmailExistMutationHookResult = ReturnType<typeof useDoesEmailExistMutation>;
export type DoesEmailExistMutationResult = Apollo.MutationResult<DoesEmailExistMutation>;
export type DoesEmailExistMutationOptions = Apollo.BaseMutationOptions<DoesEmailExistMutation, DoesEmailExistMutationVariables>;
export const DoesPhoneNumberExistDocument = gql`
    mutation DoesPhoneNumberExist($phonenumber: Long!) {
  doesPhoneNumberExist(phonenumber: $phonenumber)
}
    `;
export type DoesPhoneNumberExistMutationFn = Apollo.MutationFunction<DoesPhoneNumberExistMutation, DoesPhoneNumberExistMutationVariables>;

/**
 * __useDoesPhoneNumberExistMutation__
 *
 * To run a mutation, you first call `useDoesPhoneNumberExistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoesPhoneNumberExistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doesPhoneNumberExistMutation, { data, loading, error }] = useDoesPhoneNumberExistMutation({
 *   variables: {
 *      phonenumber: // value for 'phonenumber'
 *   },
 * });
 */
export function useDoesPhoneNumberExistMutation(baseOptions?: Apollo.MutationHookOptions<DoesPhoneNumberExistMutation, DoesPhoneNumberExistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoesPhoneNumberExistMutation, DoesPhoneNumberExistMutationVariables>(DoesPhoneNumberExistDocument, options);
      }
export type DoesPhoneNumberExistMutationHookResult = ReturnType<typeof useDoesPhoneNumberExistMutation>;
export type DoesPhoneNumberExistMutationResult = Apollo.MutationResult<DoesPhoneNumberExistMutation>;
export type DoesPhoneNumberExistMutationOptions = Apollo.BaseMutationOptions<DoesPhoneNumberExistMutation, DoesPhoneNumberExistMutationVariables>;
export const DoesUsernameExistDocument = gql`
    mutation DoesUsernameExist($username: String!) {
  doesUsernameExist(username: $username)
}
    `;
export type DoesUsernameExistMutationFn = Apollo.MutationFunction<DoesUsernameExistMutation, DoesUsernameExistMutationVariables>;

/**
 * __useDoesUsernameExistMutation__
 *
 * To run a mutation, you first call `useDoesUsernameExistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoesUsernameExistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doesUsernameExistMutation, { data, loading, error }] = useDoesUsernameExistMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useDoesUsernameExistMutation(baseOptions?: Apollo.MutationHookOptions<DoesUsernameExistMutation, DoesUsernameExistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoesUsernameExistMutation, DoesUsernameExistMutationVariables>(DoesUsernameExistDocument, options);
      }
export type DoesUsernameExistMutationHookResult = ReturnType<typeof useDoesUsernameExistMutation>;
export type DoesUsernameExistMutationResult = Apollo.MutationResult<DoesUsernameExistMutation>;
export type DoesUsernameExistMutationOptions = Apollo.BaseMutationOptions<DoesUsernameExistMutation, DoesUsernameExistMutationVariables>;