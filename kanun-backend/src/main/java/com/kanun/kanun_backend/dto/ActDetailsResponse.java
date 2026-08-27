package com.kanun.kanun_backend.dto;

import java.util.List;

public class ActDetailsResponse {

    private Long id;
    private String actCode;
    private String actName;
    private String description;
    private List<SectionResponse> sections;

    public ActDetailsResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActCode() {
        return actCode;
    }

    public void setActCode(String actCode) {
        this.actCode = actCode;
    }

    public String getActName() {
        return actName;
    }

    public void setActName(String actName) {
        this.actName = actName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<SectionResponse> getSections() {
        return sections;
    }

    public void setSections(List<SectionResponse> sections) {
        this.sections = sections;
    }
}