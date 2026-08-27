package com.kanun.kanun_backend.controller;

import com.kanun.kanun_backend.dto.ActDetailsResponse;
import com.kanun.kanun_backend.dto.SectionResponse;
import com.kanun.kanun_backend.entity.Act;
import com.kanun.kanun_backend.entity.Section;
import com.kanun.kanun_backend.repository.SectionRepository;
import com.kanun.kanun_backend.service.ActService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/acts")
public class ActController {

    private final ActService actService;
    private final SectionRepository sectionRepository;

    public ActController(
            ActService actService,
            SectionRepository sectionRepository
    ) {
        this.actService = actService;
        this.sectionRepository = sectionRepository;
    }

    @GetMapping
    public ResponseEntity<List<Act>> getActs() {

        return ResponseEntity.ok(
                actService.getAllActs()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActDetailsResponse> getActById(
            @PathVariable Long id
    ) {

        Act act;

        try {
            act = actService.getActById(id);
        } catch (RuntimeException exception) {
            return ResponseEntity.notFound().build();
        }

        List<Section> sections =
                sectionRepository.findByActId(id);

        List<SectionResponse> sectionResponses =
                sections.stream()
                        .map(section -> {

                            SectionResponse response =
                                    new SectionResponse();

                            response.setId(
                                    section.getId()
                            );

                            response.setSectionNumber(
                                    section.getSectionNumber()
                            );

                            response.setSectionTitle(
                                    section.getSectionTitle()
                            );

                            response.setDescription(
                                    section.getDescription()
                            );

                            return response;
                        })
                        .toList();

        ActDetailsResponse response =
                new ActDetailsResponse();

        response.setId(act.getId());
        response.setActCode(act.getActCode());
        response.setActName(act.getActName());
        response.setDescription(
                act.getDescription()
        );
        response.setSections(
                sectionResponses
        );

        return ResponseEntity.ok(response);
    }
}