import { Component } from '@angular/core';
import { FormGroup , FormControl, AbstractControl } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';






@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor (private accountSer : AccountService) {}

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  
  registerForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    mobile : new FormControl('')
  });


  public onSubmit (data : FormGroup) {
    const username = data.controls['userName'].value;
    const password = data.controls['password'].value;
    const mobile = data.controls['mobile'].value;
    this.accountSer.register(username , password , mobile);
    console.log('RegisterOk' , data);
  }
}
