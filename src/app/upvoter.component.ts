import { Component, Input } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

import { UpvoteGQL } from './generated/graphql';

@Component({
  selector: 'upvoter',
  template: `
    <button (click)="upvote()">Upvote</button>
  `,
})
export class UpvoterComponent {
  @Input()
  postId: number;

  constructor(private upvoteGQL: UpvoteGQL) {}

  upvote() {
    const m = this.upvoteGQL.mutate({
      postId: this.postId,
    });

    m.pipe(mergeMap(() => m)).subscribe({
      next(result) {
        console.log({ result });
      },
      error(error) {
        console.log({ error });
      },
      complete() {
        console.log('complete');
      },
    });
  }
}
