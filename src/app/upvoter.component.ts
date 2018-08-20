import { Component, Input } from '@angular/core';

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
    this.upvoteGQL
      .mutate({
        postId: this.postId,
      })
      .subscribe();
  }
}
