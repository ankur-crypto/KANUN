package com.kanun.kanun_backend.controller;

import com.kanun.kanun_backend.dto.SearchResultResponse;
import com.kanun.kanun_backend.entity.Offence;
import com.kanun.kanun_backend.entity.Section;
import com.kanun.kanun_backend.entity.SectionOffence;
import com.kanun.kanun_backend.repository.SectionOffenceRepository;
import com.kanun.kanun_backend.repository.SectionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sections")
public class SectionController {

    private final SectionRepository sectionRepository;
    private final SectionOffenceRepository sectionOffenceRepository;

    public SectionController(
            SectionRepository sectionRepository,
            SectionOffenceRepository sectionOffenceRepository
    ) {
        this.sectionRepository =
                sectionRepository;

        this.sectionOffenceRepository =
                sectionOffenceRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<SearchResultResponse>
    getSectionById(
            @PathVariable Long id
    ) {

        Section section =
                sectionRepository
                        .findById(id)
                        .orElse(null);

        if (section == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        SearchResultResponse response =
                new SearchResultResponse();

        response.setSectionId(
                section.getId()
        );

        response.setSectionNumber(
                section.getSectionNumber()
        );

        response.setSectionTitle(
                section.getSectionTitle()
        );

        response.setSectionDescription(
                section.getDescription()
        );

        response.setPunishment(
                section.getPunishment()
        );

        response.setCognizable(
                section.isCognizable()
        );

        response.setBailable(
                section.isBailable()
        );

        response.setCompoundable(
                section.isCompoundable()
        );

        response.setClassification(
                section.getClassification()
        );

        response.setCourt(
                section.getCourt()
        );

        if (section.getAct() != null) {

            response.setActId(
                    section.getAct().getId()
            );

            response.setActCode(
                    section.getAct().getActCode()
            );

            response.setActName(
                    section.getAct().getActName()
            );
        }

        List<SectionOffence> mappings =
                sectionOffenceRepository
                        .findBySectionId(id);

        if (!mappings.isEmpty()) {

            SectionOffence mapping =
                    mappings.get(0);

            Offence offence =
                    mapping.getOffence();

            if (offence != null) {

                response.setOffenceId(
                        offence.getId()
                );

                response.setOffenceName(
                        offence.getOffenceName()
                );

                response.setOffenceCategory(
                        offence.getCategory()
                );

                response.setOffenceDescription(
                        offence.getDescription()
                );
            }
        }

        return ResponseEntity.ok(
                response
        );
    }
}