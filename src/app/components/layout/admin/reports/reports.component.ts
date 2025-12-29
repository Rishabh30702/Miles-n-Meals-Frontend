import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

// Register all necessary components for Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit, AfterViewInit {
  // Access the canvas elements from the HTML
  @ViewChild('performanceCanvas') performanceCanvas!: ElementRef;
  @ViewChild('locationCanvas') locationCanvas!: ElementRef;

  performanceChart: any;
  locationChart: any;

  // Data structure that can be updated dynamically
  reportData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    revenue: [45000, 52000, 48000, 61000, 55000, 68000],
    expenses: [30000, 32000, 31000, 38000, 35000, 40000],
    locations: {
      labels: ['Downtown Mall', 'Central Station', 'Airport B', 'Harbor Plaza'],
      values: [120000, 85000, 95000, 28000]
    }
  };

  ngOnInit() {}

  ngAfterViewInit() {
    this.initPerformanceChart();
    this.initLocationChart();
  }

  initPerformanceChart() {
    this.performanceChart = new Chart(this.performanceCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.reportData.months,
        datasets: [
          {
            label: 'Revenue',
            data: this.reportData.revenue,
            backgroundColor: '#2ecc71', // Green
            borderRadius: 6,
          },
          {
            label: 'Expenses',
            data: this.reportData.expenses,
            backgroundColor: '#e74c3c', // Red
            borderRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          y: { beginAtZero: true, grid: { display: false } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  initLocationChart() {
    this.locationChart = new Chart(this.locationCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.reportData.locations.labels,
        datasets: [{
          data: this.reportData.locations.values,
          backgroundColor: ['#2980b9', '#f39c12', '#8e44ad', '#2c3e50'],
          hoverOffset: 4,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        cutout: '75%' // Creates the Donut hole
      }
    });
  }
}