import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IArticle } from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: IArticle[] = [];
  constructor(private storage: Storage) {
    this.init();
  }
  get getlocalArticles(): IArticle[] {
    return [...this._localArticles]
  }
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorite();
  }
  //? grabar y traer articulos
  async saveRemoveArticle(article: IArticle) {
    const exits = this._localArticles.find(localArticle => localArticle.title == article.title);
    if (exits) {
      this._localArticles = this._localArticles.filter(localArticle => localArticle.title !== article.title)
    } else {
      this._localArticles = [article, ...this._localArticles];
    }
    this._storage?.set('article', this._localArticles);
  }

  async loadFavorite(){
    try{
      const articles = await this.storage.get('articles');
      this._localArticles = articles || [];

    }
    catch(error){

    }
  }
 articleInFavorite(article:IArticle){
  return !!this._localArticles.find(localArticle => localArticle.title === article.title);
 }
}
