// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UserService }  from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  optionSelected;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const username = this.route.snapshot.paramMap.get('username');
  
    this.userService.getUser(username)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    console.log(this.user.ofGroupAdminsRole);

    this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

  checkClicked(val){
    this.user.ofGroupAdminsRole = !val;       
  }

}

