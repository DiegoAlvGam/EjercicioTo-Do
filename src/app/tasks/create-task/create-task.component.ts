import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  title: string = '';
  description: string = '';
  dueDate: string = '';
  errorMessage: string = '';

  constructor(private taskService: TaskService, private router: Router) {}
  createTask(): void {
    if (!this.title || !this.description) {
      this.errorMessage = 'Por favor, ingresa un título y una descripción para la tarea.';
      return;
    }
    this.taskService.createTask({ title: this.title, description: this.description, dueDate: this.dueDate }).subscribe(
      () => {
        this.router.navigate(['/tasks']);
      },
      error => {
        this.errorMessage = 'Error al crear la tarea. Por favor, inténtalo de nuevo más tarde.';
      }
    );
  }






}
