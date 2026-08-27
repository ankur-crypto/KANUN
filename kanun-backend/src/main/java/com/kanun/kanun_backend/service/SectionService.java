package com.kanun.kanun_backend.service;

import com.kanun.kanun_backend.dto.SectionResponse;
import com.kanun.kanun_backend.entity.Section;
import com.kanun.kanun_backend.repository.SectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionService {

    private final SectionRepository sectionRepository;

    public SectionService(
            SectionRepository sectionRepository
    ) {
        this.sectionRepository = sectionRepository;
    }

    public List<SectionResponse> getAllSections() {

        return sectionRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public SectionResponse getSectionById(Long id) {

        Section section = sectionRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Section not found"
                        )
                );

        return toResponse(section);
    }

    public List<SectionResponse> getSectionsByAct(
            Long actId
    ) {

        return sectionRepository
                .findByActId(actId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private SectionResponse toResponse(
            Section section
    ) {

        SectionResponse response =
                new SectionResponse();

        response.setId(section.getId());

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

        response.setSectionNumber(
                section.getSectionNumber()
        );

        response.setSectionTitle(
                section.getSectionTitle()
        );

        response.setDescription(
                section.getDescription()
        );

        response.setPunishment(
                section.getPunishment()
        );

        response.setClassification(
                section.getClassification()
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

        response.setCourt(
                section.getCourt()
        );

        response.setStatus(
                section.getStatus()
        );

        response.setSourceReference(
                section.getSourceReference()
        );

        return response;
    }
}