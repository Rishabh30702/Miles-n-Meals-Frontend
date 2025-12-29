import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales-history.component.html',
  styleUrl: './sales-history.component.css'
})
export class SalesHistoryComponent implements OnInit {
  // Filter States
  searchText: string = '';
  startDate: string = '';
  endDate: string = '';
  selectedLocation: string = '';

  // Mock Data
  allRecords = [
    { id: 1, date: '2025-12-25', location: 'Downtown Mall', revenue: 3250, expenses: 1200, status: 'Submitted' },
    { id: 2, date: '2025-12-24', location: 'Central Station', revenue: 2800, expenses: 1100, status: 'Draft' },
    { id: 3, date: '2025-12-22', location: 'Harbor Plaza', revenue: 4100, expenses: 1500, status: 'Submitted' },
    { id: 4, date: '2025-12-20', location: 'Airport Terminal B', revenue: 5600, expenses: 2100, status: 'Submitted' },
    { id: 5, date: '2025-12-18', location: 'South Indian Plaza', revenue: 1950, expenses: 850, status: 'Draft' },
    { id: 6, date: '2025-12-15', location: 'Downtown Mall', revenue: 3800, expenses: 1300, status: 'Submitted' }
  ];

  filteredRecords = [...this.allRecords];

  ngOnInit() {
    this.applyFilters();
  }

  // Combined Filter Logic
  applyFilters() {
    this.filteredRecords = this.allRecords.filter(record => {
      // 1. Search Text Filter (Checks location or status)
      const matchesSearch = !this.searchText || 
        record.location.toLowerCase().includes(this.searchText.toLowerCase()) ||
        record.status.toLowerCase().includes(this.searchText.toLowerCase());

      // 2. Date Range Filter
      const matchesStart = !this.startDate || record.date >= this.startDate;
      const matchesEnd = !this.endDate || record.date <= this.endDate;

      // 3. Location Dropdown Filter
      const matchesLocation = !this.selectedLocation || record.location === this.selectedLocation;

      return matchesSearch && matchesStart && matchesEnd && matchesLocation;
    });
  }

  onViewRecord(record: any) {
    alert(`Viewing: ${record.location}`);
  }

  onEditRecord(record: any) {
    alert(`Editing: ${record.location}`);
  }
}