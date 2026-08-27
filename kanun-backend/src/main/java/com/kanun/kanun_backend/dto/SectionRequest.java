package com.kanun.kanun_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SectionRequest {

    @NotNull
    private Long actId;

    @NotBlank
    private String sectionNumber;

    @NotBlank
    private String sectionTitle;

    private String description;

    private String punishment;

    private String classification;

    private boolean cognizable;

    private boolean bailable;

    private boolean compoundable;

    private String court;

    private String status;

    private String sourceReference;

    public Long getActId() {
        return actId;
    }

    public void setActId(Long actId) {
        this.actId = actId;
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
}