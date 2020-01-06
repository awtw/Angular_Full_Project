import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isLoginMode = true;
  isLoading = false;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    console.log(form.value);
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if(this.isLoginMode){
      //...
    } else {
      this.authService.signup(email, password).subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.isLoading = false;
      });
    }


    form.reset();
  }

}
