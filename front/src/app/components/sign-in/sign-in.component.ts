import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private _userService: UserService, private router: Router) { }

  user: User = {
    email: '',
    password: '',
    type: 'transporteur'
  };

  ngOnInit(): void {
  }

  navToRegister(): void {
    this.router.navigate(['/register']);
  }

  signIn(): void {
    const data = {
      email: this.user.email,
      password: this.user.password,
      type: this.user.type
    };

    this._userService.signIn(data)
      .subscribe(
        response => {
          if (response.length !== 0) {
            localStorage.setItem('user', JSON.stringify(data));
            this.router.navigate(['/home']);
          }
          else {

          }
        },
        error => {
          console.log(error);
        }
      );
  }

  setType(type: string): void {
    this.user.type = type;
  }
}
