import { Component, Input } from '@angular/core';

@Component({
  selector: 'upvoter',
  template: `
    <button (click)="upvote()">Upvote</button>
  `,
})
export class UpvoterComponent {
  @Input()
  postId: number;

  constructor() {}

  upvote() {}
}
