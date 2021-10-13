import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _userService: UserService, private router: Router){}

  user: User = JSON.parse(localStorage.getItem('user') || '{}');
  nbUsers: number = 0;

  ngOnInit(): void {
    this.findAllUsers();
  }

  findAllUsers(): void {
    this._userService.findAll()
      .subscribe(
        res => {
          this.nbUsers = this.countUsers(res);
        },
        error => {
          console.log(error);
        });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }

   countUsers(users: Array<User>): number {
    return users.filter((user: User) =>  user.type === this.user.type).length;
  }
}
