package com.steganography.project.controller;

import com.steganography.project.entity.Patient;
import com.steganography.project.entity.User;
import com.steganography.project.repository.PatientRepository;
import com.steganography.project.repository.UserRepository;
import com.steganography.project.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;

    public AuthController(UserService userService, UserRepository userRepository, PatientRepository patientRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        User saved = userService.register(user);
        if ("PATIENT".equalsIgnoreCase(saved.getRole())) {
            Patient patient = new Patient();
            patient.setUser(saved);
            patient.setMedicalId("MID-" + saved.getId());
            patientRepository.save(patient);
        }
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        Optional<User> userOpt = userService.login(username, password);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).build();
        }
        User user = userOpt.get();
        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "role", user.getRole(),
                "fullName", user.getFullName()
        ));
    }

    // ✅ TEST ENDPOINT (added)
    @GetMapping("/")
    public String home() {
        return "Backend running 🚀";
    }
}