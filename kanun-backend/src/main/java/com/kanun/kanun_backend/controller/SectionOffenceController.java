package com.kanun.kanun_backend.controller;

import com.kanun.kanun_backend.dto.SectionOffenceRequest;
import com.kanun.kanun_backend.entity.SectionOffence;
import com.kanun.kanun_backend.service.SectionOffenceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/section-offences")
public class SectionOffenceController {

    private final SectionOffenceService service;

    public SectionOffenceController(
            SectionOffenceService service
    ) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<SectionOffence> create(
            @Valid @RequestBody
            SectionOffenceRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        service.createRelationship(
                                request
                        )
                );
    }

    @GetMapping("/section/{sectionId}")
    public ResponseEntity<List<SectionOffence>> getBySection(
            @PathVariable Long sectionId
    ) {

        return ResponseEntity.ok(
                service.getBySection(sectionId)
        );
    }

    @GetMapping("/offence/{offenceId}")
    public ResponseEntity<List<SectionOffence>> getByOffence(
            @PathVariable Long offenceId
    ) {

        return ResponseEntity.ok(
                service.getByOffence(offenceId)
        );
    }
}