package com.kanun.kanun_backend.service;

import com.kanun.kanun_backend.dto.SectionOffenceRequest;
import com.kanun.kanun_backend.entity.Offence;
import com.kanun.kanun_backend.entity.Section;
import com.kanun.kanun_backend.entity.SectionOffence;
import com.kanun.kanun_backend.repository.OffenceRepository;
import com.kanun.kanun_backend.repository.SectionOffenceRepository;
import com.kanun.kanun_backend.repository.SectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionOffenceService {

    private final SectionOffenceRepository sectionOffenceRepository;
    private final SectionRepository sectionRepository;
    private final OffenceRepository offenceRepository;

    public SectionOffenceService(
            SectionOffenceRepository sectionOffenceRepository,
            SectionRepository sectionRepository,
            OffenceRepository offenceRepository
    ) {
        this.sectionOffenceRepository =
                sectionOffenceRepository;

        this.sectionRepository =
                sectionRepository;

        this.offenceRepository =
                offenceRepository;
    }

    public SectionOffence createRelationship(
            SectionOffenceRequest request
    ) {

        Section section = sectionRepository
                .findById(request.getSectionId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Section not found"
                        )
                );

        Offence offence = offenceRepository
                .findById(request.getOffenceId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Offence not found"
                        )
                );

        SectionOffence relationship =
                new SectionOffence();

        relationship.setSection(section);
        relationship.setOffence(offence);

        return sectionOffenceRepository.save(
                relationship
        );
    }

    public List<SectionOffence> getBySection(
            Long sectionId
    ) {

        return sectionOffenceRepository
                .findBySectionId(sectionId);
    }

    public List<SectionOffence> getByOffence(
            Long offenceId
    ) {

        return sectionOffenceRepository
                .findByOffenceId(offenceId);
    }
}