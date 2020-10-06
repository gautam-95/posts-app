import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: Post[] = [];
  public postsUpdated = new Subject<{posts: Post[], postsCount: number}>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, posts: any, postsCount: number }>(BACKEND_URL + queryParams)
      .pipe(map(postData => {
        return {
          posts: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath,
              creator: post.creator
            };
          }), postsCount: postData.postsCount
        };
      }))
      .subscribe((transformedPostsData) => {
        console.log(transformedPostsData);
        this.posts = transformedPostsData.posts;
        this.postsUpdated.next({posts: [...this.posts], postsCount: transformedPostsData.postsCount});
      });
  }

  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(postTitle: string, postContent: string, image: File) {
    const postData = new FormData();
    postData.append('title', postTitle);
    postData.append('content', postContent);
    postData.append('image', image, postTitle);
    this.http.post<{ message: string, post: Post }>(BACKEND_URL, postData).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string, creator: string }>(BACKEND_URL + id);
  }

  updatePost(id: string, postTitle: string, postContent: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof (image) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', postTitle);
      postData.append('title', postContent);
      postData.append('image', image, postTitle);
    } else {
      postData = { id: id, title: postTitle, content: postContent, imagePath: image, creator: null }
    }
    return this.http.put(BACKEND_URL + id, postData).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }

}





// addPost(postTitle: string, postContent: string, image: File) {
//   const postData = new FormData();
//   postData.append('title', postTitle);
//   postData.append('content', postContent);
//   postData.append('image', image, postTitle);
//   this.http.post<{ message: string, post: Post }>('http://localhost:3000/api/posts', postData).subscribe((response) => {
//     const post: Post = { id: response.post.id, title: postTitle, content: postContent, imagePath: response.post.imagePath };
//     this.posts.push(post);
//     this.postsUpdated.next([...this.posts]);
//     this.router.navigate(['/']);
//   });
// }


// updatePost(id: string, postTitle: string, postContent: string, image: File | string) {
//   let postData: Post | FormData;
//   if (typeof (image) === 'object') {
//     postData = new FormData();
//     postData.append('id', id);
//     postData.append('title', postTitle);
//     postData.append('title', postContent);
//     postData.append('image', image, postTitle);
//   } else {
//     postData = { id: id, title: postTitle, content: postContent, imagePath: image }
//   }
//   return this.http.put('http://localhost:3000/api/posts/' + id, postData).subscribe((response) => {
//     const updatedPosts = this.posts;
//     const updatedPostIndex = updatedPosts.findIndex(p => p.id === id);
//     const post = { id: id, title: postTitle, content: postContent, imagePath: '' }
//     updatedPosts[updatedPostIndex] = post;
//     this.posts = updatedPosts;
//     this.postsUpdated.next([...this.posts]);
//     this.router.navigate(['/']);
//   });
// }
