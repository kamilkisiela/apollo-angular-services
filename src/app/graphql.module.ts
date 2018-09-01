import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Apollo
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// GraphiQL: https://simple-posts-authors-graphql.glitch.me
const uri = 'https://simple-posts-authors-graphql.glitch.me';

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          link: httpLink.create({ uri }),
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
