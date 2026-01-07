import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  public themeService = inject(ThemeService);

  // ================= VIEW STATE =================
  activeTab: 'dashboard' | 'employees' | 'support' = 'dashboard';
  isAddingEntry = false;
  isAddingEmployee = false;
  selectedShift: 'All' | 'Day' | 'Night' = 'All';
  searchTerm = '';

  // ================= SESSION =================
  currentUser = {
    id: 'EMP882',
    name: 'John Doe',
    assignedArea: 'Agra Foodcourt'
  };

  // ================= DASHBOARD DATA =================
  salesData: any[] = [
    { 
      id: 1, 
      location: 'Agra Foodcourt', 
      category: 'Fast Food', 
      shift: 'Day', 
      revenue: 4500, 
      status: 'Completed', 
      submittedBy: 'EMP882', 
      timestamp: '2026-01-05 14:00',
      cashDifference: 0,
      cashTakenBy: null
    },
    { 
      id: 2, 
      location: 'Agra Foodcourt', 
      category: 'Beverages', 
      shift: 'Night', 
      revenue: 3200, 
      status: 'Completed', 
      submittedBy: 'EMP901', 
      timestamp: '2026-01-05 22:30',
      leavingStaffSale: 1600,
      comingStaffSale: 1600,
      cashDifference: 0,
      cashTakenBy: null
    },
    { 
      id: 3, 
      location: 'Agra Foodcourt', 
      category: 'Fast Food', 
      shift: 'Day', 
      revenue: 5200, 
      status: 'Completed', 
      submittedBy: 'EMP102', 
      timestamp: '2026-01-04 13:45',
      cashDifference: 50,
      cashTakenBy: 'EMP882'
    },
    { 
      id: 4, 
      location: 'Agra Foodcourt', 
      category: 'Desserts', 
      shift: 'Night', 
      revenue: 1800, 
      status: 'Completed', 
      submittedBy: 'EMP882', 
      timestamp: '2026-01-04 21:15',
      leavingStaffSale: 900,
      comingStaffSale: 900,
      cashDifference: 0,
      cashTakenBy: null
    },
    { 
      id: 5, 
      location: 'Agra Foodcourt', 
      category: 'Fast Food', 
      shift: 'Day', 
      revenue: 4100, 
      status: 'Completed', 
      submittedBy: 'EMP901', 
      timestamp: '2026-01-03 15:20',
      cashDifference: 0,
      cashTakenBy: null
    }
  ];

  // ================= EMPLOYEES =================
  employees = [
    { id: 'EMP882', name: 'John Doe', role: 'Counter Head', area: 'Agra Foodcourt', status: 'Active' },
    { id: 'EMP901', name: 'S. Sharma', role: 'Sales Lead', area: 'Agra Foodcourt', status: 'Active' },
    { id: 'EMP102', name: 'Ankit Kumar', role: 'Staff', area: 'Agra Foodcourt', status: 'On Leave' },
    { id: 'EMP315', name: 'Priya Singh', role: 'Staff', area: 'Agra Foodcourt', status: 'Active' }
  ];

  // ================= DAY SHIFT MODEL =================
  dayEntry = {
    shift: 'Day' as const,
    openingSale: null as number | null,
    totalSales: 0,
    onlineSales: 0,
    expenses: 0,
    category: 'NC',
    cancelled: 0,
    discount: 0,
    cashInCounter: 0,
    cashDifference: 0,
    cashTakenBy: ''
  };

  // ================= NIGHT SHIFT MODEL =================
  nightEntry = {
    shift: 'Night' as const,
    openingSale: 0,
    leavingStaffSale: 0,
    comingStaffSale: 0,
    totalSales: 0,
    onlineSales: 0,
    expenses: 0,
    category: 'NC',
    cancelled: 0,
    discount: 0,
    cashInCounter: 0,
    cashDifference: 0,
    cashTakenBy: ''
  };

  // ================= NEW EMPLOYEE =================
  newEmployee = {
    name: '',
    id: '',
    role: 'Staff'
  };

  today = new Date();

  ngOnInit() {
    setInterval(() => this.today = new Date(), 60000);
  }

  // ================= SHIFT TOGGLE =================
  toggleShift(shift: 'Day' | 'Night') {
    this.dayEntry.cashDifference = 0;
    this.nightEntry.cashDifference = 0;
  }

  // ================= CALCULATIONS =================
  calculateDayDifference() {
    const expectedCash =
      this.dayEntry.totalSales -
      this.dayEntry.onlineSales -
      this.dayEntry.expenses -
      this.dayEntry.discount -
      this.dayEntry.cancelled;

    this.dayEntry.cashDifference = this.dayEntry.cashInCounter - expectedCash;
  }

  calculateNightDifference() {
    this.nightEntry.totalSales =
      this.nightEntry.leavingStaffSale +
      this.nightEntry.comingStaffSale;

    const expectedCash =
      this.nightEntry.totalSales -
      this.nightEntry.onlineSales -
      this.nightEntry.expenses -
      this.nightEntry.discount -
      this.nightEntry.cancelled;

    this.nightEntry.cashDifference = this.nightEntry.cashInCounter - expectedCash;
  }

  // ================= SUBMIT ENTRY =================
  submitDayEntry() {
    const entry = {
      id: Date.now(),
      location: this.currentUser.assignedArea,
      shift: 'Day',
      revenue: this.dayEntry.totalSales,
      category: this.dayEntry.category,
      cashDifference: this.dayEntry.cashDifference,
      cashTakenBy: this.dayEntry.cashDifference !== 0 ? this.dayEntry.cashTakenBy : null,
      preparedBy: this.currentUser.id,
      status: 'Completed',
      submittedBy: this.currentUser.id,
      timestamp: new Date().toLocaleString()
    };

    this.salesData.unshift(entry);
    this.resetDayForm();
    this.isAddingEntry = false;
  }

  submitNightEntry() {
    const entry = {
      id: Date.now(),
      location: this.currentUser.assignedArea,
      shift: 'Night',
      revenue: this.nightEntry.totalSales,
      category: this.nightEntry.category,
      leavingStaffSale: this.nightEntry.leavingStaffSale,
      comingStaffSale: this.nightEntry.comingStaffSale,
      cashDifference: this.nightEntry.cashDifference,
      cashTakenBy: this.nightEntry.cashDifference !== 0 ? this.nightEntry.cashTakenBy : null,
      preparedBy: this.currentUser.id,
      status: 'Completed',
      submittedBy: this.currentUser.id,
      timestamp: new Date().toLocaleString()
    };

    this.salesData.unshift(entry);
    this.resetNightForm();
    this.isAddingEntry = false;
  }

  // ================= RESET =================
  resetDayForm() {
    this.dayEntry = {
      shift: 'Day',
      openingSale: null,
      totalSales: 0,
      onlineSales: 0,
      expenses: 0,
      category: 'NC',
      cancelled: 0,
      discount: 0,
      cashInCounter: 0,
      cashDifference: 0,
      cashTakenBy: ''
    };
  }

  resetNightForm() {
    this.nightEntry = {
      shift: 'Night',
      openingSale: 0,
      leavingStaffSale: 0,
      comingStaffSale: 0,
      totalSales: 0,
      onlineSales: 0,
      expenses: 0,
      category: 'NC',
      cancelled: 0,
      discount: 0,
      cashInCounter: 0,
      cashDifference: 0,
      cashTakenBy: ''
    };
  }

  // ================= FILTERED VIEWS =================
  get filteredSales() {
    const data = this.salesData.filter(
      s => s.location === this.currentUser.assignedArea
    );
    return this.selectedShift === 'All'
      ? data
      : data.filter(s => s.shift === this.selectedShift);
  }

  getTotalRevenue() {
    return this.filteredSales.reduce((sum, s) => sum + s.revenue, 0);
  }

  getDayRevenue() {
    return this.salesData
      .filter(s => s.shift === 'Day' && s.location === this.currentUser.assignedArea)
      .reduce((sum, s) => sum + s.revenue, 0);
  }

  getNightRevenue() {
    return this.salesData
      .filter(s => s.shift === 'Night' && s.location === this.currentUser.assignedArea)
      .reduce((sum, s) => sum + s.revenue, 0);
  }

  // ================= EMPLOYEE MANAGEMENT =================
  get filteredEmployees() {
    return this.employees.filter(emp =>
      emp.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  saveEmployee() {
    if (!this.newEmployee.name || !this.newEmployee.id) {
      alert('Name and Employee ID required');
      return;
    }

    this.employees.unshift({
      ...this.newEmployee,
      area: this.currentUser.assignedArea,
      status: 'Active'
    });

    this.newEmployee = { name: '', id: '', role: 'Staff' };
    this.isAddingEmployee = false;
  }

  deleteEmployee(id: string) {
    if (confirm('Remove this staff member?')) {
      this.employees = this.employees.filter(e => e.id !== id);
    }
  }
}
