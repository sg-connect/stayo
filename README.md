# Stayo — Apartment Guest Info Manager

Stayo is a tool for short-term rental hosts and property managers to create shareable, QR-code-accessible info pages for their apartments. Guests scan a QR code on arrival and instantly see WiFi credentials, entry instructions, house rules, contacts, and more — no app download needed.

## The Idea

Instead of printing laminated sheets or sending long messages to every guest, create a digital info page for each apartment. Each page gets a unique URL and QR code. Place the QR code in the apartment and guests can access everything they need from their phone.

## What It Does

- **Dashboard** — Overview of all apartments across buildings, with quick actions to edit, delete, open the public page, or download the QR code
- **Apartment Editor** — Create and edit apartments with a drag-and-drop section builder. Add sections for:
  - WiFi (network name + password)
  - Entry Instructions (door codes, key locations)
  - House Rules
  - Contact Info (name, phone, email)
  - Laundry (instructions + booking link)
  - Custom Text (anything else)
  - External Links
- **Public Guest Pages** — Clean, mobile-friendly pages at `/a/:slug` that guests see when scanning the QR code
- **QR Code Generation** — Auto-generated QR codes (PNG) for each apartment, downloadable and printable
- **Multi-Building Support** — Organize apartments by building

## Tech Stack

**Client**
- Angular 20 (standalone components)
- TypeScript
- SCSS
- RxJS

**Server**
- Node.js + Express
- TypeScript (tsx for dev)
- In-memory data store
- QR code generation (`qrcode` library)
- UUID for unique IDs

**Shared**
- Shared TypeScript types between client and server

## Getting Started

```bash
# Server
cd server
npm install
npm run dev

# Client (separate terminal)
cd client
npm install
npm start
```

The client runs on http://localhost:4200 and proxies API calls to the server on port 3200.
