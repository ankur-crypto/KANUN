package com.kanun.kanun_backend.service;

import com.kanun.kanun_backend.dto.StatisticsResponse;
import com.kanun.kanun_backend.repository.ActRepository;
import com.kanun.kanun_backend.repository.OffenceRepository;
import com.kanun.kanun_backend.repository.SectionRepository;
import org.springframework.stereotype.Service;

@Service
public class StatisticsService {

    private final ActRepository actRepository;

    private final SectionRepository sectionRepository;

    private final OffenceRepository offenceRepository;

    public StatisticsService(
            ActRepository actRepository,
            SectionRepository sectionRepository,
            OffenceRepository offenceRepository
    ) {
        this.actRepository = actRepository;
        this.sectionRepository = sectionRepository;
        this.offenceRepository = offenceRepository;
    }

    public StatisticsResponse getStatistics() {

        long acts =
                actRepository.count();

        long sections =
                sectionRepository.count();

        long offences =
                offenceRepository.count();

        return new StatisticsResponse(
                acts,
                sections,
                offences
        );
    }
}