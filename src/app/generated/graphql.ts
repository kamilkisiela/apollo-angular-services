/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent?: Parent,
  args?: Args,
  context?: Context,
  info?: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent?: P,
    args?: Args,
    context?: Context,
    info?: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent?: P,
    args?: Args,
    context?: Context,
    info?: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

/** the schema allows the following query: */
export interface Query {
  posts?: (Post | null)[] | null;
  author?: Author | null;
}

export interface Post {
  id: number;
  title?: string | null;
  author?: Author | null;
  votes?: number | null;
}

export interface Author {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  posts?: (Post | null)[] | null;
}
/** this schema allows the following mutation: */
export interface Mutation {
  upvotePost?: Post | null;
}
export interface AuthorQueryArgs {
  id: number;
}
export interface UpvotePostMutationArgs {
  postId: number;
}

/** the schema allows the following query: */
export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    posts?: PostsResolver<(Post | null)[] | null, any, Context>;
    author?: AuthorResolver<Author | null, any, Context>;
  }

  export type PostsResolver<
    R = (Post | null)[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AuthorResolver<
    R = Author | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, AuthorArgs>;
  export interface AuthorArgs {
    id: number;
  }
}

export namespace PostResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<number, any, Context>;
    title?: TitleResolver<string | null, any, Context>;
    author?: AuthorResolver<Author | null, any, Context>;
    votes?: VotesResolver<number | null, any, Context>;
  }

  export type IdResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TitleResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AuthorResolver<
    R = Author | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type VotesResolver<
    R = number | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace AuthorResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<number, any, Context>;
    firstName?: FirstNameResolver<string | null, any, Context>;
    lastName?: LastNameResolver<string | null, any, Context>;
    posts?: PostsResolver<(Post | null)[] | null, any, Context>;
  }

  export type IdResolver<R = number, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type FirstNameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type LastNameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type PostsResolver<
    R = (Post | null)[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}
/** this schema allows the following mutation: */
export namespace MutationResolvers {
  export interface Resolvers<Context = any> {
    upvotePost?: UpvotePostResolver<Post | null, any, Context>;
  }

  export type UpvotePostResolver<
    R = Post | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, UpvotePostArgs>;
  export interface UpvotePostArgs {
    postId: number;
  }
}

export namespace AllPosts {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    posts?: (Posts | null)[] | null;
  };

  export type Posts = {
    __typename?: "Post";
    id: number;
    title?: string | null;
    votes?: number | null;
    author?: Author | null;
  };

  export type Author = {
    __typename?: "Author";
    id: number;
    firstName?: string | null;
    lastName?: string | null;
  };
}

export namespace Upvote {
  export type Variables = {
    postId: number;
  };

  export type Mutation = {
    __typename?: "Mutation";
    upvotePost?: UpvotePost | null;
  };

  export type UpvotePost = {
    __typename?: "Post";
    id: number;
    votes?: number | null;
  };
}

import { Injectable } from "@angular/core";

import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

@Injectable({
  providedIn: "root"
})
export class AllPostsGQL extends Apollo.Query<
  AllPosts.Query,
  AllPosts.Variables
> {
  document: any = gql`
    query AllPosts {
      posts {
        id
        title
        votes
        author {
          id
          firstName
          lastName
        }
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class UpvoteGQL extends Apollo.Mutation<
  Upvote.Mutation,
  Upvote.Variables
> {
  document: any = gql`
    mutation Upvote($postId: Int!) {
      upvotePost(postId: $postId) {
        id
        votes
      }
    }
  `;
}
