import { Component } from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController } from 'ionic-angular';

import { CompaniesService } from '../../app/services/index';
import { Company } from '../../app/models/index';
import { CompanyDetails } from '../../modals/index';

@Component({
  selector: 'companies',
  templateUrl: 'companies.html'
})
export class CompaniesPage {
  companies: any[];
  searchQuery: string = '';
  searching: boolean = false;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private companiesService: CompaniesService
  ) {
    this.initialize();
  }

  initialize() {
    this.searching = true;
    this.companiesService.getAllCompanies().subscribe(
      data => { this.searching = false; return this.companies = data.success},
      error => this.presentError(error)
    )
  }

  doRefresh(refresher) {
    this.companiesService.getAllCompanies().subscribe(
      data => { this.companies = data.success; return refresher.complete()},
      error => this.presentError(error)
    );
  }

  presentCompanyDetails(company: Company) {
    let companyDetails = this.modalCtrl.create(CompanyDetails, {company});

    companyDetails.onDidDismiss(data => {
      this.companiesService.updateCompany(data.oldName, data.company).subscribe(
        _data => this.initialize(),
        error => this.presentError(error)
      )
    });
    
    companyDetails.present();
  }

  onAddCompany() {
    let prompt = this.alertCtrl.create({
      title: 'Company Title',
      message: 'Enter the title for a new company',
      inputs: [
        {
          type: 'text',
          placeholder: 'Google Inc.'
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
              let newCompany = new Company();
              newCompany.companyName = data[0];

              this.companiesService.addCompany(newCompany).subscribe(
                data => this.initialize(),
                error => {
                  this.presentError(error);
                }
              );
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
  
  onDeleteCompany(company: Company) {
    let confirm = this.alertCtrl.create({
      title: 'Delete this company?',
      message: 'Are you sure you want to do this? What is done cannot be undone',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.companiesService.deleteCompany(company.companyName).subscribe(
              data => this.initialize(),
              error => this.presentError(error)
            );
          }
        }
      ]
    });
    confirm.present();
  }

  presentError(error) {
    let alert = this.alertCtrl.create({
      title: 'An error ocurred!',
      subTitle: 'Please, try again',
      buttons: ['Ok']
    });
    alert.present();
  }

}
