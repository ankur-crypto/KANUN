package com.kanun.kanun_backend.service;

import com.kanun.kanun_backend.dto.ActRequest;
import com.kanun.kanun_backend.entity.Act;
import com.kanun.kanun_backend.repository.ActRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActService {

    private final ActRepository actRepository;

    public ActService(ActRepository actRepository) {
        this.actRepository = actRepository;
    }

    public List<Act> getAllActs() {
        return actRepository.findAll();
    }

    public Act getActById(Long id) {
        return actRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Act not found")
                );
    }

    public Act createAct(ActRequest request) {

        Act act = new Act();

        act.setActCode(request.getActCode());
        act.setActName(request.getActName());
        act.setShortName(request.getShortName());
        act.setDescription(request.getDescription());
        act.setCategory(request.getCategory());
        act.setStatus(request.getStatus());

        return actRepository.save(act);
    }

    public Act updateAct(Long id, ActRequest request) {

        Act act = getActById(id);

        act.setActCode(request.getActCode());
        act.setActName(request.getActName());
        act.setShortName(request.getShortName());
        act.setDescription(request.getDescription());
        act.setCategory(request.getCategory());
        act.setStatus(request.getStatus());

        return actRepository.save(act);
    }

    public void deleteAct(Long id) {

        if (!actRepository.existsById(id)) {
            throw new RuntimeException("Act not found");
        }

        actRepository.deleteById(id);
    }
}