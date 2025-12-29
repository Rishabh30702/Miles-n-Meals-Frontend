import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // REQUIRED for [(ngModel)]

@Component({
  selector: 'app-daily-sales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './daily-sales.component.html',
  styleUrl: './daily-sales.component.css'
})
export class DailySalesComponent {
  // Sets default to today (YYYY-MM-DD format required for date inputs)
  selectedDate: string = new Date().toISOString().split('T')[0];

  constructor() {}
}