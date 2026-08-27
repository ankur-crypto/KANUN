package com.kanun.kanun_backend.config;

import com.kanun.kanun_backend.entity.Act;
import com.kanun.kanun_backend.entity.Offence;
import com.kanun.kanun_backend.entity.Section;
import com.kanun.kanun_backend.entity.SectionOffence;
import com.kanun.kanun_backend.repository.ActRepository;
import com.kanun.kanun_backend.repository.OffenceRepository;
import com.kanun.kanun_backend.repository.SectionOffenceRepository;
import com.kanun.kanun_backend.repository.SectionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import java.util.List;

@Configuration
public class OffenceDataInitializer {

    @Bean
    @Order(3)
    CommandLineRunner initializeBnsOffences(
            ActRepository actRepository,
            SectionRepository sectionRepository,
            OffenceRepository offenceRepository,
            SectionOffenceRepository sectionOffenceRepository
    ) {
        return args -> {

            List<Act> acts =
                    actRepository
                            .findByActCodeContainingIgnoreCase("BNS");

            if (acts.isEmpty()) {
                return;
            }

            Act bns = acts.get(0);

            List<Section> sections =
                    sectionRepository.findByActId(
                            bns.getId()
                    );

            Section section115 = null;

            for (Section section : sections) {

                if ("115".equals(
                        section.getSectionNumber()
                )) {
                    section115 = section;
                    break;
                }
            }

            if (section115 == null) {
                return;
            }

            Offence offence = null;

            List<Offence> offences =
                    offenceRepository
                            .findByOffenceNameContainingIgnoreCase(
                                    "Voluntarily causing hurt"
                            );

            if (!offences.isEmpty()) {
                offence = offences.get(0);
            }

            if (offence == null) {

                offence = new Offence();

                offence.setOffenceName(
                        "Voluntarily causing hurt"
                );

                offence.setCategory(
                        "Offence against the human body"
                );

                offence.setDescription(
                        "Voluntarily causing hurt as provided under Section 115 of the Bharatiya Nyaya Sanhita, 2023."
                );

                offence.setStatus("ACTIVE");

                offence = offenceRepository.save(
                        offence
                );
            }

            Long offenceId = offence.getId();

            List<SectionOffence> mappings =
                    sectionOffenceRepository
                            .findBySectionId(
                                    section115.getId()
                            );

            boolean mappingExists = false;

            for (SectionOffence mapping : mappings) {

                if (mapping.getOffence() != null
                        && mapping.getOffence().getId() != null
                        && mapping.getOffence().getId()
                        .equals(offenceId)) {

                    mappingExists = true;
                    break;
                }
            }

            if (!mappingExists) {

                SectionOffence mapping =
                        new SectionOffence();

                mapping.setSection(section115);
                mapping.setOffence(offence);

                sectionOffenceRepository.save(
                        mapping
                );
            }
        };
    }
}