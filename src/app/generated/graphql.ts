/* tslint:disable */

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
