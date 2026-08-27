package com.kanun.kanun_backend.service;

import com.kanun.kanun_backend.dto.SearchResultResponse;
import com.kanun.kanun_backend.entity.Act;
import com.kanun.kanun_backend.entity.Offence;
import com.kanun.kanun_backend.entity.Section;
import com.kanun.kanun_backend.entity.SectionOffence;
import com.kanun.kanun_backend.repository.ActRepository;
import com.kanun.kanun_backend.repository.OffenceRepository;
import com.kanun.kanun_backend.repository.SectionOffenceRepository;
import com.kanun.kanun_backend.repository.SectionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    private final OffenceRepository offenceRepository;
    private final SectionRepository sectionRepository;
    private final ActRepository actRepository;
    private final SectionOffenceRepository sectionOffenceRepository;

    public SearchService(
            OffenceRepository offenceRepository,
            SectionRepository sectionRepository,
            ActRepository actRepository,
            SectionOffenceRepository sectionOffenceRepository
    ) {
        this.offenceRepository = offenceRepository;
        this.sectionRepository = sectionRepository;
        this.actRepository = actRepository;
        this.sectionOffenceRepository = sectionOffenceRepository;
    }

    public List<SearchResultResponse> search(
            String query,
            String type
    ) {

        if (query == null || query.trim().isEmpty()) {
            return List.of();
        }

        String keyword = query.trim();

        String searchType = type == null
                ? "all"
                : type.trim().toLowerCase();

        List<SearchResultResponse> results =
                new ArrayList<>();

        switch (searchType) {

            case "offence":
                searchOffences(
                        keyword,
                        results
                );
                break;

            case "section":
                searchSections(
                        keyword,
                        results
                );
                break;

            case "act":
                searchActs(
                        keyword,
                        results
                );
                break;

            case "all":
                searchOffences(
                        keyword,
                        results
                );

                searchSections(
                        keyword,
                        results
                );

                searchActs(
                        keyword,
                        results
                );
                break;

            default:
                throw new IllegalArgumentException(
                        "Invalid search type. Allowed values: all, offence, section, act"
                );
        }

        return removeDuplicates(results);
    }

    private void searchOffences(
            String keyword,
            List<SearchResultResponse> results
    ) {

        List<Offence> offences =
                offenceRepository
                        .findByOffenceNameContainingIgnoreCase(
                                keyword
                        );

        for (Offence offence : offences) {

            List<SectionOffence> relationships =
                    sectionOffenceRepository
                            .findByOffenceId(
                                    offence.getId()
                            );

            for (
                    SectionOffence relationship :
                    relationships
            ) {

                Section section =
                        relationship.getSection();

                if (section == null) {
                    continue;
                }

                results.add(
                        buildResult(
                                offence,
                                section
                        )
                );
            }
        }
    }

    private void searchSections(
            String keyword,
            List<SearchResultResponse> results
    ) {

        List<Section> sections =
                sectionRepository
                        .findBySectionNumberContainingIgnoreCase(
                                keyword
                        );

        for (Section section : sections) {

            List<SectionOffence> relationships =
                    sectionOffenceRepository
                            .findBySectionId(
                                    section.getId()
                            );

            if (relationships.isEmpty()) {

                results.add(
                        buildResult(
                                null,
                                section
                        )
                );

                continue;
            }

            for (
                    SectionOffence relationship :
                    relationships
            ) {

                Offence offence =
                        relationship.getOffence();

                results.add(
                        buildResult(
                                offence,
                                section
                        )
                );
            }
        }
    }

    private void searchActs(
            String keyword,
            List<SearchResultResponse> results
    ) {

        List<Act> acts =
                new ArrayList<>();

        acts.addAll(
                actRepository
                        .findByActNameContainingIgnoreCase(
                                keyword
                        )
        );

        acts.addAll(
                actRepository
                        .findByActCodeContainingIgnoreCase(
                                keyword
                        )
        );

        for (Act act : acts) {

            List<Section> sections =
                    sectionRepository
                            .findByActId(
                                    act.getId()
                            );

            for (Section section : sections) {

                List<SectionOffence> relationships =
                        sectionOffenceRepository
                                .findBySectionId(
                                        section.getId()
                                );

                if (relationships.isEmpty()) {

                    results.add(
                            buildResult(
                                    null,
                                    section
                            )
                    );

                    continue;
                }

                for (
                        SectionOffence relationship :
                        relationships
                ) {

                    results.add(
                            buildResult(
                                    relationship.getOffence(),
                                    section
                            )
                    );
                }
            }
        }
    }

    private SearchResultResponse buildResult(
            Offence offence,
            Section section
    ) {

        SearchResultResponse response =
                new SearchResultResponse();

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

        return response;
    }

    private List<SearchResultResponse> removeDuplicates(
            List<SearchResultResponse> results
    ) {

        return results.stream()
                .filter(
                        result ->
                                result.getSectionId() != null
                )
                .collect(
                        Collectors.toMap(
                                result ->
                                        String.valueOf(
                                                result.getOffenceId()
                                        )
                                        + "-"
                                        + result.getSectionId(),

                                result -> result,

                                (first, second) -> first
                        )
                )
                .values()
                .stream()
                .toList();
    }
}