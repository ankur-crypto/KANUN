package com.kanun.kanun_backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "sections",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_act_section_number",
                        columnNames = {"act_id", "section_number"}
                )
        }
)
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "act_id", nullable = false)
    private Act act;

    @Column(name = "section_number", nullable = false, length = 50)
    private String sectionNumber;

    @Column(name = "section_title", nullable = false, length = 250)
    private String sectionTitle;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String punishment;

    @Column(length = 100)
    private String classification;

    @Column(nullable = false)
    private boolean cognizable;

    @Column(nullable = false)
    private boolean bailable;

    @Column(nullable = false)
    private boolean compoundable;

    @Column(length = 200)
    private String court;

    @Column(length = 30)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String sourceReference;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Act getAct() {
        return act;
    }

    public void setAct(Act act) {
        this.act = act;
    }

    public String getSectionNumber() {
        return sectionNumber;
    }

    public void setSectionNumber(String sectionNumber) {
        this.sectionNumber = sectionNumber;
    }

    public String getSectionTitle() {
        return sectionTitle;
    }

    public void setSectionTitle(String sectionTitle) {
        this.sectionTitle = sectionTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPunishment() {
        return punishment;
    }

    public void setPunishment(String punishment) {
        this.punishment = punishment;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public boolean isCognizable() {
        return cognizable;
    }

    public void setCognizable(boolean cognizable) {
        this.cognizable = cognizable;
    }

    public boolean isBailable() {
        return bailable;
    }

    public void setBailable(boolean bailable) {
        this.bailable = bailable;
    }

    public boolean isCompoundable() {
        return compoundable;
    }

    public void setCompoundable(boolean compoundable) {
        this.compoundable = compoundable;
    }

    public String getCourt() {
        return court;
    }

    public void setCourt(String court) {
        this.court = court;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSourceReference() {
        return sourceReference;
    }

    public void setSourceReference(String sourceReference) {
        this.sourceReference = sourceReference;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}