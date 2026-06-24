# Kiyulex Music Showcase

A music showcase web application that generates deterministic fake music tracks using seeded randomization.
Each track includes generated metadata such as title, artist, album, genre, likes, and even procedurally generated audio playback.

## Features

* Seed-based deterministic music generation
* Infinite song browsing with pagination
* Dynamic likes filtering
* Multi-language support
* Expandable track details
* Procedurally generated audio using Tone.js
* Generated album / artist / lyrics data
* Responsive UI with Tailwind CSS

## Tech Stack

### Frontend

* React
* JavaScript
* Tailwind CSS
* Tone.js

### Backend

* Java
* Spring Boot

## How It Works

The application requests song data from the backend using parameters:

* `seed`
* `page`
* `likes`
* `lang`

Example request:

```bash
GET /showcase?seed=12345&page=1&likes=5&lang=en_US
```

Using the same seed always produces identical tracks, which makes generation reproducible.

## Installation

### Clone repository

```bash
git clone <your-repo-url>
cd kiyulex-music-showcase
```

### Backend setup

```bash
cd backend
./mvnw spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

## Project Structure

```bash
kiyulex-music-showcase/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   └── generators/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── assets/
```
## Author

Created by Yeldar
