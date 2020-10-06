import { Component, OnInit } from '@angular/core';
import { Post } from './posts/post.model';
import { PostService } from './posts/post.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}


 //posts: Post[] = [];

  // addPost(post) {
  //   this.posts.push(post);
  // }
