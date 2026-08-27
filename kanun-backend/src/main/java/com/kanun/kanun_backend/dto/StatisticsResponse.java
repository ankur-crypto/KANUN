package com.kanun.kanun_backend.dto;

public class StatisticsResponse {

    private long acts;
    private long sections;
    private long offences;

    public StatisticsResponse(
            long acts,
            long sections,
            long offences
    ) {
        this.acts = acts;
        this.sections = sections;
        this.offences = offences;
    }

    public long getActs() {
        return acts;
    }

    public long getSections() {
        return sections;
    }

    public long getOffences() {
        return offences;
    }
}