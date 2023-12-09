import { Component } from '@angular/core';
import { branch } from '../Models/BranchModel';
import { RestApiService } from '../Services/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  branchItem : branch[] = [] ;

  constructor (private http : RestApiService<any>, private router : Router) {  }
  ngOnInit(): void {
    this.getAllBranches();
  }
  // public items  = [
  //   { name : 'amir' , family : 'alimoradi'},
  //   { name : 'amir' , family : 'alimoradi'},
  //   { name : 'amir' , family : 'alimoradi'}
  // ]

  public getAllBranches() {
   this.http.getEntity('GetAllBranches').subscribe((data:branch[]) => {
    this.branchItem = data;
   })
  }
  openMenuDigital(ip: string,port:string) {
   const url = `https://${ip}:${port}`;
   location.href = url;
  }
 
}
