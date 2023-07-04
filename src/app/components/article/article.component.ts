import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/interfaces';
import { Browser } from '@capacitor/browser';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: IArticle = {} as IArticle;
  @Input() index: number = 0;
  constructor(
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
  ) { }

  ngOnInit() { }
  async onOpenMenu() {
    const articleInFavorite = this.storageService.articleInFavorite(this.article);
    let normalBtns: ActionSheetButton[] = [{
      text: articleInFavorite ? 'Remover favorito' : 'Favorito',
      icon: articleInFavorite ? 'heart' : 'heart-outline',
      handler: () => this.onToggleFavorite()
    },
    {
      text: 'Cancelar',
      icon: 'close-outline',
      role: 'cancelar'
    }]

    const shareBtn = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle()
    };
    console.log('estamos en capacitor' + this.platform.is('capacitor'))
    if (this.platform.is('capacitor')) {
      normalBtns.unshift(shareBtn);
    }
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBtns
    })


    await actionSheet.present();

  }

  onShareArticle() {
    console.log('onshared')
    const { title, source, url } = this.article;
    this.socialSharing.share(
      title,
      source.name,
      '',
      url
    )
  }
  onToggleFavorite() {
    console.log('favorite')
    this.storageService.saveRemoveArticle(this.article);

  }
  async openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      await Browser.open({ url: this.article.url });
      return;
    }
    window.open(this.article.url, 'blank')

  }

}
