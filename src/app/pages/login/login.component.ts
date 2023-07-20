import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  passwordControl: FormControl = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginWithGoogle(): void {
    this.authenticationService
      .signInWithGoogle()
      .then((res: any) => {
        this.router.navigateByUrl('home');
      })
      .catch((error: any) => {
        window.alert(error);
      });
  }

  loginWithEmailAndPassword() {
    console.log(this.loginForm.value);
    const userData: any = Object.assign(this.loginForm.value, {
      email: this.loginForm.value.username,
    });
    this.authenticationService
      .signInWithEmailAndPassword(userData)
      .then((res: any) => {
        this.router.navigateByUrl('home');
      })
      .catch((error: any) => {
        window.alert(error);
      });
  }
}
