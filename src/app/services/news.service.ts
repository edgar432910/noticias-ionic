import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ArticlesByCategoryAndPage, IArticle, INewsResponse } from '../interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
const apikey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};
  constructor(private http: HttpClient) { }

  private executeQuery<T>(endpoint: string) {
    console.log(`Peticion HTTP realizada`)
    return this.http.get<T>(`${apiUrl}${endpoint}`, {
      params: {
        apiKey: apikey,
        country: 'us'
      }
    })
  }

  getTopHeadLines(): Observable<IArticle[]> {
    return this.getArticlesByCategory('business');

  }
  getTopHeadLinesByCategory(category: string, loadMore: boolean = false): Observable<IArticle[]> {

    if (loadMore) {
      return this.getArticlesByCategory(category);
    }
    if (this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }
    return this.getArticlesByCategory(category);

  }
  private getArticlesByCategory(category: string): Observable<IArticle[]> {
    // Saber si existe, nueva peticion 
    if (!Object.keys(this.articlesByCategoryAndPage).includes(category)) {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;
    return this.executeQuery<INewsResponse>(`/top-headlines?category=${category}&page=${page}`)
      .pipe(
        map(({ articles }) => {
          if (articles.length === 0) return this.articlesByCategoryAndPage[category].articles;
          this.articlesByCategoryAndPage[category] = {
            page: page,
            articles: [ ...this.articlesByCategoryAndPage[category].articles, ...articles]
          }
          return this.articlesByCategoryAndPage[category].articles;
        })
      );

  }


}
