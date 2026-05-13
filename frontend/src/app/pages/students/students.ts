import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students',
  imports: [FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students implements OnInit {
  students: any[] = [];

  name = '';
  lastName = '';
  age: number | null = null;
  gradeLevel = '';
  group = '';

  message = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
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

  createStudent(): void {
    const student = {
      name: this.name,
      lastName: this.lastName,
      age: this.age,
      gradeLevel: this.gradeLevel,
      group: this.group
    };

    this.studentService.createStudent(student).subscribe({
      next: () => {
        this.message = 'Estudiante creado correctamente';
        this.clearForm();
        this.loadStudents();
      },
      error: () => {
        this.message = 'Error creando estudiante';
      }
    });
  }

  deleteStudent(id: string): void {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.message = 'Estudiante eliminado correctamente';
        this.loadStudents();
      },
      error: () => {
        this.message = 'Error eliminando estudiante';
      }
    });
  }

  clearForm(): void {
    this.name = '';
    this.lastName = '';
    this.age = null;
    this.gradeLevel = '';
    this.group = '';
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToGrades(): void {
    this.router.navigate(['/grades']);
  }
}