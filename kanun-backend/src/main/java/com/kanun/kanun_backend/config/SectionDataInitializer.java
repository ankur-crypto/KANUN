package com.kanun.kanun_backend.config;

import com.kanun.kanun_backend.entity.Act;
import com.kanun.kanun_backend.entity.Section;
import com.kanun.kanun_backend.repository.ActRepository;
import com.kanun.kanun_backend.repository.SectionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
public class SectionDataInitializer {

    @Bean
    @Order(2)
    CommandLineRunner initializeBnsSections(
            ActRepository actRepository,
            SectionRepository sectionRepository
    ) {
        return args -> {

            Act bns = actRepository
                    .findByActCodeContainingIgnoreCase("BNS")
                    .stream()
                    .findFirst()
                    .orElse(null);

            if (bns == null) {
                return;
            }

            addSection(
                    sectionRepository,
                    bns,
                    "1",
                    "Short title, commencement and application."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "2",
                    "Definitions."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "3",
                    "General explanations."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "4",
                    "Punishments."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "5",
                    "Commutation of sentence."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "6",
                    "Fractions of terms of punishment."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "7",
                    "Sentence may be (in certain cases of imprisonment) wholly or partly rigorous or simple."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "8",
                    "Amount of fine, liability in default of payment of fine, etc."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "9",
                    "Limit of punishment of offence made up of several offences."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "10",
                    "Punishment of person guilty of one of several offences, judgment stating that it is doubtful of which."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "11",
                    "Solitary confinement."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "12",
                    "Limit of solitary confinement."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "13",
                    "Enhanced punishment for certain offences after previous conviction."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "14",
                    "Act done by a person bound, or by mistake of fact believing himself bound, by law."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "15",
                    "Act of Judge when acting judicially."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "16",
                    "Act done pursuant to judgment or order of Court."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "17",
                    "Act done by a person justified, or by mistake of fact believing himself justified, by law."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "18",
                    "Accident in doing a lawful act."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "19",
                    "Act likely to cause harm, but done without criminal intent, and to prevent other harm."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "20",
                    "Act of a child under seven years of age."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "21",
                    "Act of a child above seven and under twelve years of age of immature understanding."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "22",
                    "Act of a person of unsound mind."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "23",
                    "Act of a person incapable of judgment by reason of intoxication caused against his will."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "24",
                    "Offence requiring a particular intent or knowledge committed by one who is intoxicated."
            );

            addSection(
                    sectionRepository,
                    bns,
                    "115",
                    "Voluntarily causing hurt."
            );
        };
    }

    private void addSection(
            SectionRepository sectionRepository,
            Act act,
            String sectionNumber,
            String sectionTitle
    ) {

        boolean exists = sectionRepository
                .findByActId(act.getId())
                .stream()
                .anyMatch(section ->
                        section.getSectionNumber()
                                .equals(sectionNumber)
                );

        if (exists) {
            return;
        }

        Section section = new Section();

        section.setAct(act);
        section.setSectionNumber(sectionNumber);
        section.setSectionTitle(sectionTitle);
        section.setDescription(null);
        section.setPunishment(null);
        section.setClassification(null);
        section.setCognizable(false);
        section.setBailable(false);
        section.setCompoundable(false);
        section.setCourt(null);
        section.setStatus("ACTIVE");
        section.setSourceReference(
                "India Code - The Bharatiya Nyaya Sanhita, 2023"
        );

        sectionRepository.save(section);
    }
}