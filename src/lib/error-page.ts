// Minimal fallback SSR error page; rendered when the React server tree
// throws or when h3 swallows an error into a JSON 500 response.
export function renderErrorPage(): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Site error</title><meta name="robots" content="noindex"><style>body{font-family:system-ui,sans-serif;background:#0b0f19;color:#eee;margin:0;display:grid;place-items:center;min-height:100vh}main{max-width:520px;padding:32px;text-align:center}h1{font-size:20px;margin:0 0 12px}a{color:#9effa3;text-decoration:underline}a:hover{text-decoration:none}</style></head><body><main><h1>This page didn't load</h1><p>Something went wrong on our end. Try refreshing, or <a href="/">go home</a>.</p></main></body></html>`;
}
