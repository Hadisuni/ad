# AdForge campaign API

For the automation (n8n) that sends campaigns to the app and starts video renders. Settings are in `.env.example`.

## Authentication

`POST` routes need `Authorization: Bearer <AD_INGEST_TOKEN>`. If `AD_INGEST_TOKEN` is not set (or is shorter than 24
characters) they answer `503` instead of being open. `GET` routes are public: the 32-character campaign id in the link
is the secret.

Every answer is `{ "success": boolean, "data"?: …, "error"?: string }`. Every call is rate limited per caller (`429`).

## Send a campaign

`POST /api/campaigns` with the campaign as JSON (the `AdCampaign` shape in `src/types/ads.ts`).

- `tone` is one of `Urgent & High-Converting`, `Executive & Trustworthy`, `Relatable & Viral`, `Bold & Disruptive`.
- `language` is `en` or `fa`.
- Images (`squareImage`, `verticalImage`, `landscapeImage`) are an `https://` address or an `/images/<file>` path.
- `squareImageAlt`, `verticalImageAlt`, `landscapeImageAlt` are optional alt texts (aim for 125 characters or fewer).
- Body limit 256 KB. A wrong field answers `400` and names the field, for example `tone: Invalid option…`.

`201` answer:

```json
{ "success": true, "data": {
  "id": "<32 hex>", "previewUrl": "https://…/?c=<id>", "createdAt": "2026-11-23T18:49:23.057Z",
  "errorCount": 2,
  "checks": [ { "id": "google-headline-length", "severity": "error", "platform": "google",
                "message": { "en": "…", "fa": "…" } } ] } }
```

`errorCount > 0` means a platform would reject something (a Google headline over 30 characters, a caption over 2200,
more than 30 hashtags…). Fix it before publishing. `warn` and `info` checks are advice: unsourced figures like `62%` or
`$1,500`, missing alt text, copy in the wrong language, long LinkedIn headlines and email subjects.

## Read a campaign

`GET /api/campaigns/:id` returns `{ campaign, createdAt, checks, errorCount }`. Open `previewUrl` to see it in the app.

## Video ad (optional, costs money)

Needs `GEMINI_API_KEY`; without it these routes answer `503` / `404` and nothing is spent.

- `POST /api/campaigns/:id/video` (token) starts an 8 second vertical clip built from the campaign's Reels story.
  `202` started, `200` already exists, `429` the daily cap (`MAX_VIDEOS_PER_DAY`, default 3) is used up.
- `GET /api/campaigns/:id/video` returns `{ status: "running" | "done" | "failed", error?, url? }`. Each call asks the
  model once, so poll it (every 15 to 30 seconds) until it is no longer `running`.
- `GET /api/campaigns/:id/video/file` is the `video/mp4` once `done`.

The prompt asks for no on-screen text or logo (the model cannot spell); add the brand, badge and call to action in the
edit. The model may add its own sound; this has not been checked against a real render. A clip not ready after 30 minutes is marked `failed`, and a failed job can be started again.

## Storage

Campaigns and clips live in `DATA_DIR` (default: the system temp folder). On Cloud Run that is wiped when the instance is
replaced, so treat them as previews, not an archive.
