package com.kanun.kanun_backend.dto;

public class SearchResult {

    private Long id;

    private String type;

    private String title;

    private String subtitle;

    private String description;

    private Long actId;

    private String actName;

    private String sectionNumber;

    public SearchResult() {
    }

    public SearchResult(
            Long id,
            String type,
            String title,
            String subtitle,
            String description,
            Long actId,
            String actName,
            String sectionNumber
    ) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.actId = actId;
        this.actName = actName;
        this.sectionNumber = sectionNumber;
    }

    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public String getDescription() {
        return description;
    }

    public Long getActId() {
        return actId;
    }

    public String getActName() {
        return actName;
    }

    public String getSectionNumber() {
        return sectionNumber;
    }
}