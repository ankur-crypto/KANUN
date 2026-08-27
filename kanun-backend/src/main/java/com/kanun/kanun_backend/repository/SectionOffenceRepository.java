package com.kanun.kanun_backend.repository;

import com.kanun.kanun_backend.entity.SectionOffence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SectionOffenceRepository
        extends JpaRepository<SectionOffence, Long> {

    List<SectionOffence> findBySectionId(
            Long sectionId
    );

    List<SectionOffence> findByOffenceId(
            Long offenceId
    );
}