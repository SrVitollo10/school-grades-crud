import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { GradeService } from '../../services/grade.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-grades',
  imports: [FormsModule],
  templateUrl: './grades.html',
  styleUrl: './grades.css'
})
export class Grades implements OnInit {
  grades: any[] = [];
  students: any[] = [];

  student = '';
  subject = '';
  score: number | null = null;
  period = '';
  teacher = '';

  message = '';

  constructor(
    private gradeService: GradeService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadGrades();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  loadGrades(): void {
    this.gradeService.getGrades().subscribe({
      next: (data) => {
        this.grades = data;
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  createGrade(): void {
    const grade = {
      student: this.student,
      subject: this.subject,
      score: this.score,
      period: this.period,
      teacher: this.teacher
    };

    this.gradeService.createGrade(grade).subscribe({
      next: () => {
        this.message = 'Nota creada correctamente';
        this.clearForm();
        this.loadGrades();
      },
      error: () => {
        this.message = 'Error creando nota';
      }
    });
  }

  deleteGrade(id: string): void {
    this.gradeService.deleteGrade(id).subscribe({
      next: () => {
        this.message = 'Nota eliminada correctamente';
        this.loadGrades();
      },
      error: () => {
        this.message = 'Error eliminando nota';
      }
    });
  }

  clearForm(): void {
    this.student = '';
    this.subject = '';
    this.score = null;
    this.period = '';
    this.teacher = '';
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToStudents(): void {
    this.router.navigate(['/students']);
  }
}