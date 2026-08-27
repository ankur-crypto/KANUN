package com.kanun.kanun_backend.service;

import com.kanun.kanun_backend.dto.OffenceRequest;
import com.kanun.kanun_backend.entity.Offence;
import com.kanun.kanun_backend.repository.OffenceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OffenceService {

    private final OffenceRepository offenceRepository;

    public OffenceService(
            OffenceRepository offenceRepository
    ) {
        this.offenceRepository = offenceRepository;
    }

    public List<Offence> getAllOffences() {
        return offenceRepository.findAll();
    }

    public Offence getOffenceById(Long id) {

        return offenceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Offence not found"
                        )
                );
    }

    public Offence createOffence(
            OffenceRequest request
    ) {

        Offence offence = new Offence();

        offence.setOffenceName(
                request.getOffenceName()
        );

        offence.setCategory(
                request.getCategory()
        );

        offence.setDescription(
                request.getDescription()
        );

        offence.setStatus(
                request.getStatus()
        );

        return offenceRepository.save(offence);
    }

    public Offence updateOffence(
            Long id,
            OffenceRequest request
    ) {

        Offence offence = getOffenceById(id);

        offence.setOffenceName(
                request.getOffenceName()
        );

        offence.setCategory(
                request.getCategory()
        );

        offence.setDescription(
                request.getDescription()
        );

        offence.setStatus(
                request.getStatus()
        );

        return offenceRepository.save(offence);
    }

    public void deleteOffence(Long id) {

        if (!offenceRepository.existsById(id)) {
            throw new RuntimeException(
                    "Offence not found"
            );
        }

        offenceRepository.deleteById(id);
    }
}