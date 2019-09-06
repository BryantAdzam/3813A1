import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User }         from '../user';
import { UserService }  from '../user.service';

import { Group }         from '../group';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})

export class GroupDetailComponent implements OnInit {

  users: User[];
  groupId;
  userAdded:User;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private location: Location) { }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');
    this.getUsers();
  }

  getUsers(): void {
    this.users = new Array();
    this.userService.getUsers()
    .subscribe(users => {
      users.forEach(element => {
        if (element.groupList.includes(this.groupId)){
          this.users.push(element);
        }
      });
    }
      );
  }

  add(username: string): void {

    username = username.trim();
    if (!username) { return; }

    this.userService.getUser(username).subscribe(
      user=>{
        // console.log("tt::" + JSON.stringify(user));
        if(user)
        {
          // console.log("tt::" + JSON.stringify(user));
          this.userAdded = user;
          this.updateUser(user);
        }
        else{
          username='';
          return;
        }
      }
    );
  }

  updateUser(user: User): void  {

    user.groupList.push(this.groupId);
    // console.log("tt1::" + user.groupList);
    this.userService.updateUser(user)
      .subscribe(user => {
        // console.log(group);
        this.users.push(user);
      });
  }

  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
  }

}
