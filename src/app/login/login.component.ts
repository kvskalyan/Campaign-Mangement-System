import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isAdmin:boolean;
  title:String;
  email:string;
  password: string;
  constructor(private router:Router,
    private userService:UserService) { }

  ngOnInit(){
    this.isAdmin=true;
    this.title = 'Campaign Registration Management System';
  }
  
  login(event:any){
    this.userService.getLogin(this.email,this.password)
    .subscribe( (data) => {
        this.isAdmin=data;
        if(this.isAdmin)
          this.router.navigate(['adminHome']);
      })
  }
}
