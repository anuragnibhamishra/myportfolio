# Activity Tracker Backend

A small TypeScript/Express API that accepts the Android activity payload and stores only the latest activity in memory. It also broadcasts activity changes with Socket.IO. It does not include authentication, a database, or portfolio integration.

## Setup

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Adjust `.env` if needed:

```env
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
```

`ALLOWED_ORIGIN` accepts a comma-separated list of specific origins. Do not use `*` for production.

## Run locally

Development with watch mode:

```powershell
npm run dev
```

Build TypeScript:

```powershell
npm run build
```

Start the compiled server:

```powershell
npm start
```

The default server URL is `http://localhost:5000`. The server binds to `0.0.0.0`, so it can also accept connections on the host machine's LAN address.

## Production

Set the required environment variables in the hosting platform:

```env
PORT=5000
ALLOWED_ORIGIN=https://your-portfolio-domain.example
```

`PORT` is supplied by most hosting platforms and falls back to `5000` locally. `ALLOWED_ORIGIN` must contain one or more comma-separated `http` or `https` origins. Wildcard origins are not accepted.

Build and start the compiled server:

```powershell
npm run build
npm start
```

The HTTP server and Socket.IO share the same port. The hosting platform must support long-lived HTTP connections and WebSocket upgrades for Socket.IO.

## API

### Health

```powershell
curl.exe http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Activity Tracker API is running"
}
```

### Store current activity

```powershell
curl.exe -X POST http://localhost:5000/api/activity `
  -H "Content-Type: application/json" `
  -d '{"app":"Instagram","packageName":"com.instagram.android","action":"Scrolling Instagram","startedAt":1756990000000}'
```

The backend adds `receivedAt` and replaces the previous current activity.

### Read current activity

```powershell
curl.exe http://localhost:5000/api/activity/current
```

### Replace with YouTube

```powershell
curl.exe -X POST http://localhost:5000/api/activity `
  -H "Content-Type: application/json" `
  -d '{"app":"YouTube","packageName":"com.google.android.youtube","action":"Watching YouTube","startedAt":1756990100000}'
```

A subsequent `GET /api/activity/current` returns YouTube.

### Invalid payload

```powershell
curl.exe -i -X POST http://localhost:5000/api/activity `
  -H "Content-Type: application/json" `
  -d '{}'
```

Expected status: `400`.

```json
{
  "success": false,
  "error": "Invalid activity payload"
}
```

### Clear current activity

```powershell
curl.exe -X POST http://localhost:5000/api/activity/clear
curl.exe http://localhost:5000/api/activity/current
```

The final response contains `"data": null`.

## Socket.IO

Connect Socket.IO clients to the server URL. The server emits `activity:update` when a new activity differs from the current activity, and emits `activity:update` with `null` when the activity is cleared. On connection, the client receives the current in-memory activity through `activity:current`, or `null` when none exists.

For a local smoke test, run the backend in one terminal and the client in another:

```powershell
npm run dev
npm run socket:test
```

## Validation and errors

The activity payload requires non-empty `app`, `packageName`, and `action` strings plus a positive, realistic `startedAt` timestamp. Invalid JSON, invalid payloads, unknown routes, and unexpected errors return consistent JSON error responses.

## Limitation

The current activity is held in process memory only. Restarting the backend clears it. No historical activities are retained, and no external database or network integration is included in this milestone.
