package com.kiyulex.music_showcase;

import com.kiyulex.music_showcase.dto.SongRecordDto;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MusicGenerationService {


    private static final int PAGE_SIZE = 20;

    public List<SongRecordDto> generateSongs(long seed, int page, double avgLikes, String lang) {
        List<SongRecordDto> batch = new ArrayList<>();

        Locale locale = Locale.forLanguageTag(lang.replace("_", "-"));


        for (int i = 0; i < PAGE_SIZE; i++) {

            int sequenceIndex = (page - 1) * PAGE_SIZE + i + 1;
            long rowSeed = (seed * 1103515245L + sequenceIndex) & 0x7FFFFFFFL;

            Faker faker = new Faker(locale, new Random(rowSeed));

            String genre = faker.music().genre();
            String artist = generateArtist(faker);
            String title = generateTitle(faker);
            String album = generateAlbum(faker);

            int likes = calculateLikes(faker, avgLikes);

            SongRecordDto song = SongRecordDto.builder()
                    .sequenceIndex(sequenceIndex)
                    .trackSeed(rowSeed)
                    .title(title)
                    .artist(artist)
                    .album(album)
                    .genre(genre)
                    .likes(likes)
                    .build();

            batch.add(song);
        }

        return batch;
    }

    private int calculateLikes(Faker faker, double avgLikes) {
        int baseLikes = (int) Math.floor(avgLikes);
        double fraction = avgLikes - baseLikes;


        if (faker.random().nextDouble() < fraction) {
            return baseLikes + 1;
        }
        return baseLikes;
    }

    private String generateTitle(Faker faker) {
        return faker.book().title();
    }

    private String generateArtist(Faker faker) {
        if (faker.random().nextBoolean()) {
            return faker.name().fullName();
        } else {
            return faker.company().name();
        }
    }

    private String generateAlbum(Faker faker) {
        if (faker.random().nextInt(1, 100) <= 25) {
            return "Single";
        }
        return faker.book().title();
    }
}