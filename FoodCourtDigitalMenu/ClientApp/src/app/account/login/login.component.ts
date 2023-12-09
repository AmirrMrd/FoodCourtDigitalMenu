import { Component } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import { AccountService } from '../../Services/account.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private accountSer : AccountService){}

  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });



  public onSubmit (data : FormGroup) {
    const username = data.controls['userName'].value;
    const password = data.controls['password'].value;
    this.accountSer.login(username , password);
    console.log('loginOk' , data);
  }
}
