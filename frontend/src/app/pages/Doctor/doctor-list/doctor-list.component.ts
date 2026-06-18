import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DoctorService } from "src/app/services/doctor.service";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-doctor-list",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./doctor-list.component.html",
  styleUrls: ["./doctor-list.component.css"],
})
export class DoctorListComponent implements OnInit {
  doctors: any[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        console.log(data);
        this.doctors = data;
      },
      error: (error) => {
        console.error("Error fetching doctors", error);
      },
    });
  }

  deleteDoctor(id: number): void {
    this.doctorService.deleteDoctor(id).subscribe({
      next: () => {
        this.loadDoctors();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
