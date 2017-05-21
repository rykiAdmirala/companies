import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { Company } from '../app/models/index';

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Edit company "{{ company.companyName }}"
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()">
            <span ion-text color="primary" showWhen="ios">Cancel</span>
            <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div padding>
        <ion-segment [(ngModel)]="activeSegment" color="dark">
          <ion-segment-button value="name">
            Company Info
          </ion-segment-button>
          <ion-segment-button value="products">
            Products
          </ion-segment-button>
        </ion-segment>
      </div>

      <div [ngSwitch]="activeSegment">
        <div class="" *ngSwitchCase="'name'">
          <ion-item>
            <ion-label>Company name</ion-label>
            <ion-input
              required
              name="companyName"
              [(ngModel)]="company.companyName"
            >
            </ion-input>
          </ion-item>
          <div padding>
            <button ion-button block class="mt-25" (click)="dismiss()">Update company</button>
          </div>

        </div>
        
        <ion-list *ngSwitchCase="'products'">
          <ion-list-header>
            List of company products:
          </ion-list-header>
          <ion-item
            *ngFor="let good of company.companyGoods; let i = index;"        
          >
            {{ good }}
            <ion-icon name="trash" item-right (click)="onDeleteGood(i)"></ion-icon>
          </ion-item>

          <ion-row justify-content-center class="mt-25">
            <ion-col col-auto>
              <button ion-button outline round color="secondary" (click)="onAddGood()">
                Add new product
              </button>
            </ion-col>
          </ion-row>
        </ion-list>
      </div>

    </ion-content>

  `
})
export class CompanyDetails {
  company: Company;
  activeSegment: string = 'name';
  oldCompanyName: string;

  constructor(
    private navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController
  ) {
    this.company = this.navParams.get('company');
    this.oldCompanyName = this.company.companyName;
  }


  dismiss() {
    this.viewCtrl.dismiss({company: this.company, oldName: this.oldCompanyName});
  }

  onAddGood() {
    let prompt = this.alertCtrl.create({
      title: 'Product Title',
      message: 'Enter the title for a new product',
      inputs: [
        {
          type: 'text',
          placeholder: 'MIG-24'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: data => {
            if (data[0] != '') {
              this.company.companyGoods.push(data[0]);
            } else { 
              prompt.setMessage('Please, enter at least anything!');
              return false;
            }
          }
        }
      ]
    })

    prompt.present();    
  }

  
  onDeleteGood(index) {
    return this.company.companyGoods.splice(index, 1);
  }

}