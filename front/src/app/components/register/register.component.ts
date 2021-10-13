import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  existingUser: String = '';
  error: String = '';

  user: User = {
    email: '',
    password: '',
    type: ''
  };

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    this.error  = '';
    const data = {
      email: this.user.email,
      password: this.user.password,
      type: this.user.type
    };

    this._userService.create(data)
      .subscribe(
        response => {
          console.log(response.status);
          if (response.status === 400 && response.error.message) {
            this.error = "Veuillez remplir tous les champs";
          }
            localStorage.setItem('user', JSON.stringify(data));
            this.router.navigate(['/home']);
        },
        error => {
          if (error.status === 400 && error.error.message) {
            this.error = error.error.message;
          }
          this.existingUser = error.error.text;
          console.log(error);
        }
      );
  }

  setType(type: string): void {
    this.user.type = type;
  }

  navToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }
}
