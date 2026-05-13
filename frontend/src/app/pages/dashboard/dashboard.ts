import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  totalStudents = 0;
  totalGrades = 0;
  averageScore = 0;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.dashboardService.getStats().subscribe({
      next: (data) => {
        this.totalStudents = data.totalStudents;
        this.totalGrades = data.totalGrades;
        this.averageScore = data.averageScore;
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  goToStudents(): void {
    this.router.navigate(['/students']);
  }

  goToGrades(): void {
    this.router.navigate(['/grades']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}