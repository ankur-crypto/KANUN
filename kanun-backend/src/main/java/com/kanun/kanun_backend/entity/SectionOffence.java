package com.kanun.kanun_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "section_offences",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_section_offence",
                        columnNames = {
                                "section_id",
                                "offence_id"
                        }
                )
        }
)
public class SectionOffence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "section_id", nullable = false)
    private Section section;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "offence_id", nullable = false)
    private Offence offence;

    public Long getId() {
        return id;
    }

    public Section getSection() {
        return section;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    public Offence getOffence() {
        return offence;
    }

    public void setOffence(Offence offence) {
        this.offence = offence;
    }
}