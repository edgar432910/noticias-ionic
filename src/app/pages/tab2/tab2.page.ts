import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { IArticle } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll!:IonInfiniteScroll;

  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology']
  public selectedCategory: string = this.categories[0];
  public articles: IArticle[] = [];

  constructor(private newsServices: NewsService) { }
  ngOnInit(): void {
    this.newsServices.getTopHeadLinesByCategory(this.selectedCategory).subscribe(articles => {
      this.articles = [...articles];
    })
  }

  segmentChanged(event: Event): void {

    this.selectedCategory = (event as CustomEvent).detail.value;
    this.newsServices.getTopHeadLinesByCategory(this.selectedCategory).subscribe(articles => {
      this.articles = [...articles];
    })
  }
  loadData() {
    console.log({ event });
    this.newsServices.getTopHeadLinesByCategory(this.selectedCategory, true)
      .subscribe(articles => {
        if(articles.length === this.articles.length){
          this.infiniteScroll.disabled = true;
          // event.target.disable = true;
          return;
        }

        this.articles = articles;
        this.infiniteScroll.complete();
        // event.target.complete();
      })

  }

}
