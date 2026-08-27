package com.kanun.kanun_backend.config;

import com.kanun.kanun_backend.entity.Act;
import com.kanun.kanun_backend.repository.ActRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
public class DataInitializer {

    @Bean
    @Order(1)
    CommandLineRunner initializeActs(
            ActRepository actRepository
    ) {
        return args -> {

            if (actRepository
                    .findByActCodeContainingIgnoreCase("BNS")
                    .isEmpty()) {

                Act act = new Act();

                act.setActCode("BNS");

                act.setActName(
                        "The Bharatiya Nyaya Sanhita, 2023"
                );

                act.setShortName("BNS");

                act.setDescription(
                        "The Bharatiya Nyaya Sanhita, 2023."
                );

                act.setCategory("Criminal Law");

                act.setStatus("ACTIVE");

                actRepository.save(act);
            }
        };
    }
}