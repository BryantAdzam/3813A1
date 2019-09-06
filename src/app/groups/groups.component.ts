import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

import { Group } from '../group';
import { GroupService } from '../group.service';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Group[];
  cwu:string;

  constructor(private groupService: GroupService, private router: Router) { }

  ngOnInit() {
    console.log(sessionStorage);

    if (sessionStorage.length == 0){
      this.router.navigateByUrl('/login');
    }
    else {
      // console.log("sdfsaf");
      this.cwu = sessionStorage.getItem("currentUser");
      console.log(this.cwu);
      if (JSON.parse(this.cwu).ofGroupAdminsRole){
        this.getGroups();
      }
    }
  }

  getGroups(): void {
    this.groupService.getGroups()
    .subscribe(groups => this.groups = groups);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.groupService.addGroup({ name } as Group)
      .subscribe(group => {
        // console.log(group);
        this.groups.push(group);
      });
  }

  delete(group: Group): void {
    this.groups = this.groups.filter(g => g !== group);
    this.groupService.deleteGroup(group).subscribe();
  }

}