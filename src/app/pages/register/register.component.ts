import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  hideConfirmPassword = true;

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registerWithEmailAndPassword() {
    console.log(this.registerForm.value);
    const userData: any = Object.assign(this.registerForm.value, {
      email: this.registerForm.value.username,
    });
    this.authenticationService
      .registerWithEmailAndPassword(userData)
      .then((res: any) => {
        this.router.navigateByUrl('login');
      })
      .catch((error: any) => {
        window.alert(error);
      });
  }
}
