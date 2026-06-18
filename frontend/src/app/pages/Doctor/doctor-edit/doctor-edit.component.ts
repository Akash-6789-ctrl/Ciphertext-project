import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorService } from "src/app/services/doctor.service";

@Component({
  selector: "app-edit-doctor",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./doctor-edit.component.html",
  styleUrls: ["./doctor-edit.component.css"],
})
export class DoctorEditComponent implements OnInit {
  id!: number;

  doctor: any = {
    name: "",
    email: "",
    specialization: "",
    qualification: "",
    experience: 0,
    availability: true,
  };

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));

    this.doctorService.getDoctorById(this.id).subscribe({
      next: (data) => {
        this.doctor = data;
      },
    });
  }

  updateDoctor(): void {
    this.doctorService.updateDoctor(this.id, this.doctor).subscribe({
      next: () => {
        alert(
          "Profile submitted successfully. Wait for admin approval before login.",
        );

        this.router.navigate(["/login"]);
      },
    });
  }
}
