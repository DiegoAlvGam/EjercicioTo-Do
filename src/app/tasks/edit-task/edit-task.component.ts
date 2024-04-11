import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.model';


@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  task: Task = { id: 0, title: '', description: '', dueDate: '' };
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getTaskDetails();
  }

  getTaskDetails(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(taskId).subscribe(
      task => {
        this.task = task;
      },
      error => {
        this.errorMessage = 'Error al obtener los detalles de la tarea.';
      }
    );
  }

  updateTask(): void {
    this.taskService.updateTask(this.task.id, this.task).subscribe(
      () => {
        this.router.navigate(['/tasks']);
      },
      error => {
        this.errorMessage = 'Error al actualizar la tarea.';
      }
    );
  }
}
