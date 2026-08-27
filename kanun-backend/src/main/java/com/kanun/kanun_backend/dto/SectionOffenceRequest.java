package com.kanun.kanun_backend.dto;

import jakarta.validation.constraints.NotNull;

public class SectionOffenceRequest {

    @NotNull
    private Long sectionId;

    @NotNull
    private Long offenceId;

    public Long getSectionId() {
        return sectionId;
    }

    public void setSectionId(Long sectionId) {
        this.sectionId = sectionId;
    }

    public Long getOffenceId() {
        return offenceId;
    }

    public void setOffenceId(Long offenceId) {
        this.offenceId = offenceId;
    }
}