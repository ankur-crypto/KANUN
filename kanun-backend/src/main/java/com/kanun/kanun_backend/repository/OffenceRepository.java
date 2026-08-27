package com.kanun.kanun_backend.repository;

import com.kanun.kanun_backend.entity.Offence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OffenceRepository
        extends JpaRepository<Offence, Long> {

    List<Offence> findByOffenceNameContainingIgnoreCase(
            String offenceName
    );
}