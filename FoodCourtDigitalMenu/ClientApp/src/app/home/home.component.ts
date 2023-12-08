import { Component } from '@angular/core';
import { branch } from '../Models/BranchModel';
import { RestApiService } from '../Services/rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  branchItem : branch[] = [] ;

  constructor (private http : RestApiService<any>) {  }
  ngOnInit(): void {
    this.getAllBranches();
  }
  // public items  = [
  //   { name : 'amir' , family : 'alimoradi'},
  //   { name : 'amir' , family : 'alimoradi'},
  //   { name : 'amir' , family : 'alimoradi'}
  // ]

  public getAllBranches() {
   this.http.getEntity('GetAllBranches').subscribe((data:[]) => {
    this.branchItem = data;
   })
  }
}
