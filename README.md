# Stayo 🏠

**Digital guest info pages for short-term rentals — scan a QR code, get everything you need.**

Stayo replaces printed laminated sheets and long guest messages with clean, mobile-friendly info pages. Create a page for each apartment, add WiFi credentials, entry instructions, house rules, and more — then generate a QR code. Place it in the apartment. Done.

![Screenshot placeholder](https://via.placeholder.com/960x540/FFF0F3/FF385C?text=Stayo+Dashboard)

---

## Features

- **Dashboard** — Overview of all apartments across buildings with stats, quick actions, and QR code previews
- **Apartment Editor** — Build info pages with a section-based editor supporting:
  - WiFi (network + password)
  - Entry Instructions (door codes, key locations)
  - House Rules
  - Contact Info (name, phone, email)
  - Laundry (instructions + booking link)
  - Custom Text
  - External Links
- **Public Guest Pages** — Clean, animated pages at `/a/:slug` that guests see when scanning the QR code
- **QR Code Generation** — Auto-generated QR codes (1024px PNG) for each apartment, downloadable and printable
- **Multi-Building Support** — Organize apartments by building
- **Copy to Clipboard** — Guests can tap to copy WiFi passwords and other details
- **Responsive Design** — Looks great on phones, which is how most guests will access it

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Angular 20, TypeScript, SCSS, RxJS |
| **Backend** | Node.js, Express 4, TypeScript (tsx) |
| **QR Codes** | `qrcode` library (PNG + data URL) |
| **Data** | In-memory store (seed data included) |
| **Shared** | Shared TypeScript types between client and server |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Run the server

```bash
cd server
npm install
npm run dev
```

The API starts at **http://localhost:3200**.

### Run the client

```bash
cd client
npm install
npm start
```

The app opens at **http://localhost:4200** and proxies API calls to the server.

## Project Structure

```
stayo/
  client/          Angular 20 frontend (standalone components)
    src/app/
      manager/       Dashboard + Apartment editor
      public/        Guest-facing public page
      shared/        Reusable section renderer
      services/      API service layer
      models/        TypeScript interfaces
  server/          Express API
    src/
      routes/        apartments, public, qr
      data/          In-memory store with seed data
      types/         Shared type re-exports
  shared/          TypeScript types shared across client & server
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/apartments` | List all apartments |
| `GET` | `/api/apartments/:id` | Get apartment by ID |
| `POST` | `/api/apartments` | Create apartment |
| `PUT` | `/api/apartments/:id` | Update apartment |
| `DELETE` | `/api/apartments/:id` | Delete apartment |
| `GET` | `/api/apartments/buildings/list` | List all buildings |
| `GET` | `/api/public/:slug` | Get public apartment data |
| `GET` | `/api/qr/:slug` | Download QR code as PNG |
| `GET` | `/api/qr/:slug/data` | Get QR code as data URL |
| `GET` | `/api/health` | Health check |

## License

Internal hackathon project.
