package com.steganography.project.controller;

import java.util.List;

import com.steganography.project.entity.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.steganography.project.service.AppointmentService;
import com.steganography.project.Dto.AppointmentRequest;
import com.steganography.project.entity.Appointment;


@RestController
@RequestMapping("/appointments")
@CrossOrigin("*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/book")
    public Appointment bookAppointment(
            @RequestBody AppointmentRequest request) {

        return appointmentService.bookAppointment(request);
    }

    @PutMapping("/{id}/approve")
    public Appointment approveAppointment(
            @PathVariable Long id) {

        return appointmentService.approveAppointment(id);
    }

    @PutMapping("/{id}/reject")
    public Appointment rejectAppointment(
            @PathVariable Long id) {

        return appointmentService.rejectAppointment(id);
    }

    @PutMapping("/{id}/cancel")
    public Appointment cancelAppointment(
            @PathVariable Long id) {

        return appointmentService.cancelAppointment(id);
    }

    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatient(
            @PathVariable Long patientId) {

        return appointmentService.getAppointmentsByPatient(patientId);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctor(
            @PathVariable Long doctorId) {

        return appointmentService.getAppointmentsByDoctor(doctorId);
    }

}

