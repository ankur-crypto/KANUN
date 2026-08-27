package com.kanun.kanun_backend.dto;

public class SearchResultResponse {

    private Long offenceId;
    private String offenceName;
    private String offenceCategory;
    private String offenceDescription;

    private Long sectionId;
    private String sectionNumber;
    private String sectionTitle;
    private String sectionDescription;
    private String punishment;

    private Boolean cognizable;
    private Boolean bailable;
    private Boolean compoundable;

    private String classification;
    private String court;

    private Long actId;
    private String actCode;
    private String actName;

    public Long getOffenceId() {
        return offenceId;
    }

    public void setOffenceId(Long offenceId) {
        this.offenceId = offenceId;
    }

    public String getOffenceName() {
        return offenceName;
    }

    public void setOffenceName(String offenceName) {
        this.offenceName = offenceName;
    }

    public String getOffenceCategory() {
        return offenceCategory;
    }

    public void setOffenceCategory(String offenceCategory) {
        this.offenceCategory = offenceCategory;
    }

    public String getOffenceDescription() {
        return offenceDescription;
    }

    public void setOffenceDescription(
            String offenceDescription
    ) {
        this.offenceDescription = offenceDescription;
    }

    public Long getSectionId() {
        return sectionId;
    }

    public void setSectionId(Long sectionId) {
        this.sectionId = sectionId;
    }

    public String getSectionNumber() {
        return sectionNumber;
    }

    public void setSectionNumber(
            String sectionNumber
    ) {
        this.sectionNumber = sectionNumber;
    }

    public String getSectionTitle() {
        return sectionTitle;
    }

    public void setSectionTitle(
            String sectionTitle
    ) {
        this.sectionTitle = sectionTitle;
    }

    public String getSectionDescription() {
        return sectionDescription;
    }

    public void setSectionDescription(
            String sectionDescription
    ) {
        this.sectionDescription =
                sectionDescription;
    }

    public String getPunishment() {
        return punishment;
    }

    public void setPunishment(String punishment) {
        this.punishment = punishment;
    }

    public Boolean getCognizable() {
        return cognizable;
    }

    public void setCognizable(Boolean cognizable) {
        this.cognizable = cognizable;
    }

    public Boolean getBailable() {
        return bailable;
    }

    public void setBailable(Boolean bailable) {
        this.bailable = bailable;
    }

    public Boolean getCompoundable() {
        return compoundable;
    }

    public void setCompoundable(Boolean compoundable) {
        this.compoundable = compoundable;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(
            String classification
    ) {
        this.classification = classification;
    }

    public String getCourt() {
        return court;
    }

    public void setCourt(String court) {
        this.court = court;
    }

    public Long getActId() {
        return actId;
    }

    public void setActId(Long actId) {
        this.actId = actId;
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
}