export type Maybe<T> = T | null;

// ====================================================
// Documents
// ====================================================

export namespace AllPosts {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    posts: Maybe<(Maybe<Posts>)[]>;
  };

  export type Posts = {
    __typename?: "Post";

    id: number;

    title: Maybe<string>;

    votes: Maybe<number>;

    author: Maybe<Author>;
  };

  export type Author = AuthorFragment.Fragment;
}

export namespace Upvote {
  export type Variables = {
    postId: number;
  };

  export type Mutation = {
    __typename?: "Mutation";

    upvotePost: Maybe<UpvotePost>;
  };

  export type UpvotePost = {
    __typename?: "Post";

    id: number;

    votes: Maybe<number>;
  };
}

export namespace AuthorFragment {
  export type Fragment = {
    __typename?: "Author";

    id: number;

    firstName: Maybe<string>;

    lastName: Maybe<string>;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// GraphQL Fragments
// ====================================================

export const AuthorFragmentFragment = gql`
  fragment AuthorFragment on Author {
    id
    firstName
    lastName
  }
`;

// ====================================================
// Apollo Services
// ====================================================

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
          ...AuthorFragment
        }
      }
    }

    ${AuthorFragmentFragment}
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

// ====================================================
// END: Apollo Angular template
// ====================================================
