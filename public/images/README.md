# Public Images Folder

Place images here that **do not** need to be processed by Vite. These are served as-is.

Use this for:
- Large gallery photos
- Event posters
- Faculty headshots
- Any image you reference by URL path (not import)

Reference these in your data files using paths like:
```javascript
imageUrl: "/images/event-poster.jpg"
photoUrl: "/images/faculty/dr-anitha.jpg"
```

## Recommended Structure

```
public/images/
├── gallery/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
├── events/
│   ├── techfest-2026.jpg
│   └── workshop.jpg
└── faculty/
    ├── anitha-s.jpg
    ├── rajesh-kumar.jpg
    └── ...
```

## Image Optimization Tips

- Compress images before uploading (use [TinyPNG](https://tinypng.com))
- Keep file sizes under 500 KB for fast loading
- Use JPG for photos, PNG for graphics with transparency
- Name files descriptively (e.g., `techfest-2026-group-photo.jpg`)
