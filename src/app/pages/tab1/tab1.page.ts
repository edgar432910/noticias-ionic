import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { IArticle } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;
  public articles: IArticle[] = [];

  constructor(private newService: NewsService) { }
  ngOnInit() {
    this.newService.getTopHeadLines().subscribe((articles) => {
      this.articles = articles;
    })
  }
  loadData() {
    this.newService.getTopHeadLinesByCategory('business', true).subscribe((articles) => {
      if (this.articles.length == articles.length) {
        this.infiniteScroll.disabled = true;
        return;
      }
      this.articles = articles;
      this.infiniteScroll.complete();


    })

  }

}
