package com.cinepro.backcinepro.user;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMINISTRATEUR')")
public class AdminController {

    @GetMapping
    @PreAuthorize("hasAuthority('administrateur:read')")
    public String get() {
        return "GET:: administrateur controller";
    }

    @PostMapping
    @PreAuthorize("hasAuthority('administrateur:create')")
    @Hidden
    public String post() {
        return "POST:: administrateur controller";
    }

    @PutMapping
    @PreAuthorize("hasAuthority('administrateur:update')")
    @Hidden
    public String put() {
        return "PUT:: administrateur controller";
    }

    @DeleteMapping
    @PreAuthorize("hasAuthority('administrateur:delete')")
    @Hidden
    public String delete() {
        return "DELETE:: administrateur controller";
    }
}