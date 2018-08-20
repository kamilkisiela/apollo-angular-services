import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { AllPostsGQL, Post } from './generated/graphql';

@Component({
  selector: 'list',
  template: `
    <ul>
      <li *ngFor="let post of posts | async">
        {{post.title}} by {{post.author.firstName}} {{post.author.lastName}}
        ({{post.votes}}) votes
        <upvoter [postId]="post.id"></upvoter>
      </li>
    </ul>
  `,
})
export class ListComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor(private allPostsGQL: AllPostsGQL) {}

  ngOnInit() {
    this.posts = this.allPostsGQL
      .watch()
      .valueChanges.pipe(pluck('data', 'posts'));
  }
}
