# Quran API

Quran API is a NestJS REST backend for Quran text, surah metadata, ayah pagination, full-text search, reciter audio URLs, audio proxy streaming, and Arabic font metadata. It uses TypeScript, SQLite through `better-sqlite3`, raw SQL repositories, Swagger/OpenAPI, and automatic first-run seeding from public Quran JSON sources.

## Getting Started

```bash
npm install
npm run start:dev
```

Swagger UI is available at:

```text
http://localhost:3000/api/docs
```

The OpenAPI JSON spec is available at:

```text
http://localhost:3000/api/docs-json
```

## Seeding

The database is seeded automatically on first run when the `surahs` table is empty. Seeding downloads all 114 surah JSON files and all 114 English translation files, inserts the data into SQLite, and rebuilds the FTS5 search index.

Check seed counts with:

```bash
npm run seed:check
```

## API Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | API and database health check |
| GET | `/surahs` | List all 114 surahs |
| GET | `/surahs/:id` | Get a single surah by number |
| GET | `/surahs/:surahId/ayahs` | Get paginated ayahs for a surah |
| GET | `/surahs/:surahId/ayahs/:ayahNumber` | Get a specific ayah |
| GET | `/audio/reciters` | List available reciters |
| GET | `/audio/surah/:surahId/ayah/:ayahNumber` | Get an ayah audio URL |
| GET | `/audio/proxy/surah/:surahId/ayah/:ayahNumber` | Stream ayah audio through the API server |
| GET | `/search` | Full-text search across Arabic or English ayah text |
| GET | `/fonts` | Get available Arabic fonts and default size settings |
| GET | `/fonts/:id` | Get a specific font by ID |

## Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3000` | HTTP port for the NestJS server |
| `DB_PATH` | `./quran.sqlite` | SQLite database file path |
| `NODE_ENV` | `development` | Runtime environment |

## Notes

Rate limiting is enabled globally at 100 requests per 60 seconds per IP.
