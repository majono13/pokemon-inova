import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/entities/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.loginWithGoogle()
  }

}
