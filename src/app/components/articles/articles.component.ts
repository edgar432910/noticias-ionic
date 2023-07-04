import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/interfaces';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent  {
 @Input() articles:IArticle[] =[];
  constructor() { }

}
