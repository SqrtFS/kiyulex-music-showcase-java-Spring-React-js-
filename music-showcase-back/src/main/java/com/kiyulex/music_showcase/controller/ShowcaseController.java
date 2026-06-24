package com.kiyulex.music_showcase.controller;

import com.kiyulex.music_showcase.MusicGenerationService;
import com.kiyulex.music_showcase.dto.SongRecordDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/showcase")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ShowcaseController {

    private final MusicGenerationService musicGenerationService;

    @GetMapping
    public ResponseEntity<List<SongRecordDto>> getSongs(
            @RequestParam(defaultValue = "12345") long seed,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "0.0") double likes,
            @RequestParam(defaultValue = "en_US") String lang
    ) {
        List<SongRecordDto> songs = musicGenerationService.generateSongs(seed, page, likes, lang);

        return ResponseEntity.status(HttpStatus.OK).body(songs);
    }
}