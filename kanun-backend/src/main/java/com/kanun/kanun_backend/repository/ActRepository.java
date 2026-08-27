package com.kanun.kanun_backend.repository;

import com.kanun.kanun_backend.entity.Act;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActRepository
        extends JpaRepository<Act, Long> {

    List<Act> findByActNameContainingIgnoreCase(
            String actName
    );

    List<Act> findByActCodeContainingIgnoreCase(
            String actCode
    );
}