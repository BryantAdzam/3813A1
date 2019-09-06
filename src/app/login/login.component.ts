import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  username: string

  check(): void {
    this.username = this.username.trim();
    console.log(this.username);
    if (!this.username) { return; }
    this.userService.checkUser(this.username).subscribe(user => {
      console.log(user);
      if (user != null) {
        // console.log(typeof user.ofGroupAdminsRole);

        sessionStorage.setItem('currentUser', JSON.stringify(user));

        if(user.ofGroupAdminsRole){
          // console.log('groups');
            this.router.navigate(['/groups']);
        } 
        else{
          // console.log('no')
          this.router.navigate(['/userdetail', user.username]);
        }
      }
    });
  }
}

