import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { post } from 'selenium-webdriver/http';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {

  // @Output() postCreated = new EventEmitter<Post>();
  // postCreated = new EventEmitter<Post>();
  enteredTitle = '';
  enteredContent = '';
  mode = 'create';
  postId: string;
  editPost: Post;
  isLoading = false;
  postsForm: FormGroup;
  imagePreview: string;
  private authStatusSub: Subscription;

  constructor(public postsService: PostService, public route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe((authStatus) => {
      this.isLoading = false;
    });
    this.postsForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })

      // test: new FormControl()
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((post) => {
          this.isLoading = false;
          this.editPost = { id: post._id, title: post.title, content: post.content, imagePath: post.imagePath, creator: post.creator };
          this.postsForm.setValue({
            title: this.editPost.title,
            content: this.editPost.content,
            image: this.editPost.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    this.postsForm.patchValue({
      image: file
    });
    this.postsForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.postsForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.postsForm.value.title, this.postsForm.value.content, this.postsForm.value.image);
    } else {
      this.postsService.updatePost(this.postId, this.postsForm.value.title, this.postsForm.value.content, this.postsForm.value.image);
    }

    this.postsForm.reset();
    // const post: Post = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postCreated.emit(post);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
