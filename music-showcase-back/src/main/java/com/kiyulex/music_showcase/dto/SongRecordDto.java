package com.kiyulex.music_showcase.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SongRecordDto {
    @NotBlank(message = "sequenceIndex is required")
    private int sequenceIndex;
    @NotBlank(message = "title is required")
    private String title;
    @NotBlank(message = "artist is required")
    private String artist;
    @NotBlank(message = "album is required")
    private String album;
    @NotBlank(message = "genre is required")
    private String genre;
    @NotBlank(message = "likes is required")
    private int likes;
    @NotBlank(message = "trackSeed is required")
    private long trackSeed;
}
