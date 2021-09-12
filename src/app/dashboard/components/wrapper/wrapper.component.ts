import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  expanded: Boolean = false;
  user = JSON.parse(localStorage.getItem('profile') || '{}');
  token = localStorage.getItem('token');

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    // this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.auth.deauthenticate();
    this.router.navigate(['/login']);
  }

}
