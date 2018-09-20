import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User;
  errors: Array<any> = [];
  errorMessage: string;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getUser(id);
  }

  onSubmit(): void{

    this.usersService.editUser(this.user).subscribe(
      (response:any) => {
        this.response(response);
      }
    );
  }

  response(response:any): void{

    if(response.success===false){
      this.errors = response.error.errors;
      this.errorMessage = response.error._message;
    }

    if(response.success===true){
      this.router.navigate(['/users/view/', response.user._id]);
    }
  }

  getUser(id:string):void{
    this.usersService.getUser(id).subscribe(
      (response:any)=>{
        this.user = response.user;
      }
    );
  }

}
