import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('revenueCanvas') revenueCanvas!: ElementRef;
  chart: any;

  ngOnInit() {}

  ngAfterViewInit() {
    this.initChart();
  }

  initChart() {
    const ctx = this.revenueCanvas.nativeElement.getContext('2d');

    const revenueGradient = ctx.createLinearGradient(0, 0, 0, 400);
    revenueGradient.addColorStop(0, 'rgba(46, 204, 113, 0.2)');
    revenueGradient.addColorStop(1, 'rgba(46, 204, 113, 0.0)');

    const expensesGradient = ctx.createLinearGradient(0, 0, 0, 400);
    expensesGradient.addColorStop(0, 'rgba(231, 76, 60, 0.2)');
    expensesGradient.addColorStop(1, 'rgba(231, 76, 60, 0.0)');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Revenue',
            data: [8200, 9100, 8500, 9500, 10200, 11800, 10500],
            borderColor: '#2ecc71',
            backgroundColor: revenueGradient,
            fill: true,
            tension: 0.4,
            pointRadius: 0
          },
          {
            label: 'Expenses',
            data: [4200, 4400, 4300, 4600, 4900, 5200, 4500],
            borderColor: '#e74c3c',
            backgroundColor: expensesGradient,
            fill: true,
            tension: 0.4,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              // FIXED: Added null check to satisfy TypeScript
              label: (context) => {
                const value = context.parsed.y;
                return value !== null ? ` $${value.toLocaleString()}` : '';
              }
            }
          }
        },
        scales: {
          y: { 
            beginAtZero: true, 
            grid: { color: '#f0f0f0' },
            ticks: { callback: (value) => '$' + value }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }
}