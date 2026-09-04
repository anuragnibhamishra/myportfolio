# Activity Tracker Backend

A small TypeScript/Express API that accepts the Android activity payload and stores only the latest activity in memory. It is intentionally local and does not include authentication, a database, WebSockets, or portfolio integration.

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

## Run

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

The default server URL is `http://localhost:5000`.

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

## Validation and errors

The activity payload requires non-empty `app`, `packageName`, and `action` strings plus a positive, realistic `startedAt` timestamp. Invalid JSON, invalid payloads, unknown routes, and unexpected errors return consistent JSON error responses.

## Limitation

The current activity is held in process memory only. Restarting the backend clears it. No historical activities are retained, and no external database or network integration is included in this milestone.
