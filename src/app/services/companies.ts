import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompaniesService {
  
  path: string = '/companies';
  
  constructor(private api: ApiService) {}
  
  getAllCompanies(): Observable<any> {
    return this.api.get(this.path);
  }

  getCompany(companyName: string): Observable<any> {
    return this.api.get(`${this.path}/${companyName}`);
  }

  addCompany(body: any): Observable<any> {
    return this.api.post(this.path, body);
  }

  updateCompany(companyName: string, body: any): Observable<any> {
    return this.api.put(
      `${this.path}/${companyName}`,
      body
    );
  }

  deleteCompany(companyName: string): Observable<any> {
    return this.api.delete(`${this.path}/${companyName}`);
  }
  
}