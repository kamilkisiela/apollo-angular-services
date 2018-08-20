import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
  posts: Observable<any[]>;

  constructor() {}

  ngOnInit() {}
}
