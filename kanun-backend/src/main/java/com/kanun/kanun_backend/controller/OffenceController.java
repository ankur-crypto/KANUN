package com.kanun.kanun_backend.controller;

import com.kanun.kanun_backend.dto.OffenceRequest;
import com.kanun.kanun_backend.entity.Offence;
import com.kanun.kanun_backend.service.OffenceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offences")
public class OffenceController {

    private final OffenceService offenceService;

    public OffenceController(
            OffenceService offenceService
    ) {
        this.offenceService = offenceService;
    }

    @GetMapping
    public ResponseEntity<List<Offence>> getAllOffences() {

        return ResponseEntity.ok(
                offenceService.getAllOffences()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offence> getOffence(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                offenceService.getOffenceById(id)
        );
    }

    @PostMapping
    public ResponseEntity<Offence> createOffence(
            @Valid @RequestBody OffenceRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        offenceService.createOffence(
                                request
                        )
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Offence> updateOffence(
            @PathVariable Long id,
            @Valid @RequestBody OffenceRequest request
    ) {

        return ResponseEntity.ok(
                offenceService.updateOffence(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffence(
            @PathVariable Long id
    ) {

        offenceService.deleteOffence(id);

        return ResponseEntity.noContent().build();
    }
}