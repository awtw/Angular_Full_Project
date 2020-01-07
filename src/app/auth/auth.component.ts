import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: [ './auth.component.css' ]
})
export class AuthComponent implements OnInit, OnDestroy {
	constructor(private authService: AuthService, private router: Router, private componentFctoryResolver: ComponentFactoryResolver) {}

	ngOnInit() {}

	isLoginMode = true;
	isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}
	onSubmit(form: NgForm) {
		// console.log(form.value);
		if (!form.valid) {
			return;
		}
		const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;



		if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
		} else {
			authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errRes) => {
        console.log(errRes);
        this.error = errRes;
        this.showErrorAlert(errRes);
        this.isLoading = false;
        // this.router.navigate(['/auth'])
      }
    );

		form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(message: string){
    const alertCmpFactory = this.componentFctoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this .closeSub = componentRef.instance.close.subscribe(()=> {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

}
