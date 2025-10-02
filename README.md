# Bellara Website Template

Template website React TypeScript dengan struktur komponen yang terpisah dan menggunakan **Tailwind CSS** + font Inter.

## Struktur Folder

```
src/
├── components/
│   ├── header/
│   │   └── index.tsx
│   ├── menu/
│   │   └── index.tsx
│   ├── testimonial/
│   │   └── index.tsx
│   └── footer/
│       └── index.tsx
├── App.tsx
├── App.css
├── index.tsx
└── index.css (Tailwind CSS)
```

## Cara Menggunakan

1. Install dependencies:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm start
   ```

3. Build untuk production:
   ```bash
   npm run build
   ```

## Komponen yang Tersedia

- **Header**: Komponen untuk bagian header website
- **Menu**: Komponen untuk navigation/menu
- **Testimonial**: Komponen untuk bagian testimonial  
- **Footer**: Komponen untuk bagian footer

## Technology Stack

- **React 18** dengan TypeScript
- **Tailwind CSS** untuk styling
- **Font Inter** dari Google Fonts

## Styling dengan Tailwind CSS

Template ini menggunakan Tailwind CSS dengan konfigurasi:
- Font family: `font-inter` (Inter dari Google Fonts)
- Responsive design classes
- Utility-first CSS approach

Contoh classes yang sering digunakan:
- `max-w-7xl mx-auto` - Container maksimal width dengan margin auto
- `px-4 sm:px-6 lg:px-8` - Responsive padding horizontal
- `font-inter` - Menggunakan font Inter
- `text-xl font-semibold` - Text size dan font weight

## Catatan

- Semua komponen sudah setup dengan TypeScript
- Tailwind CSS sudah dikonfigurasi dengan PostCSS
- Responsive design menggunakan Tailwind breakpoints
- Font Inter sudah terintegrasi dalam Tailwind config
- Error JSX sudah diperbaiki dengan konfigurasi TypeScript yang benar

Silakan edit setiap komponen dan tambahkan Tailwind classes sesuai kebutuhan desain Anda!