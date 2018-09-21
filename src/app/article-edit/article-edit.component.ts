import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { ArticlesService } from '../articles.service';
import { Article } from '../article';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: [
    './article-edit.component.scss',
    '../user-create/user-create.component.scss'
  ]
})
export class ArticleEditComponent implements OnInit {

  article: Article;
  errors: Array<any> = [];
  errorMessage: string;

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getArticle(id);
  }

  onSubmit(): void{

    this.articlesService.editArticle(this.article).subscribe(
      (response:any) => {
        this.response(response);
        console.log(response)
      }
    );
  }

  response(response:any): void{

    if(response.success===false){
      this.errors = response.error.errors;
      this.errorMessage = response.error._message;
    }

    if(response.success===true){
      this.router.navigate(['/articles/view/', response.article._id]);
    }
  }

  getArticle(id:string):void{
    this.articlesService.getArticle(id).subscribe(
      (response:any)=>{
        this.article = response.article;

      }
    );
  }

}
