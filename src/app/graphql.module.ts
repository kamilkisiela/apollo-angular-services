import { NgModule } from '@angular/core';
// Apollo
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { schema } from './schema';

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory() {
        return {
          link: new SchemaLink({ schema }),
          cache: new InMemoryCache(),
        };
      },
    },
  ],
})
export class GraphQLModule {}
