import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private loggedIn : boolean = false;
  constructor( private router : Router) { }

  public isAthenticated () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 100);
    });
  }

  public login (user : string , password : string) {
    if (user === 's' && password === '1') {
      this.loggedIn = true;
      this.router.navigate(['dashboard/add-branch']);
      return this.loggedIn;
    }
    else {
      this.loggedIn = false;
      return this.loggedIn;
    }
  }

  public register (user : string , password : string  , mobile : string) {
    if (user === null ||  password === null ||  mobile === null) {
      return console.log('registered'); 
    }
    else {
      return console.log('Not Registered');
    }
  }
}
