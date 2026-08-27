package com.kanun.kanun_backend.controller;

import com.kanun.kanun_backend.dto.SearchResultResponse;
import com.kanun.kanun_backend.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final SearchService searchService;

    public SearchController(
            SearchService searchService
    ) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<List<SearchResultResponse>> search(
            @RequestParam String q,
            @RequestParam(defaultValue = "all") String type
    ) {

        return ResponseEntity.ok(
                searchService.search(q, type)
        );
    }
}