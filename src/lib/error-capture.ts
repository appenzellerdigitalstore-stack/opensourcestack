// Tiny shared capture for h3-swallowed SSR errors. Real reporter logic
// (Sentry/Datadog/etc) can plug in here later.

let lastError: unknown | undefined;

export function consumeLastCapturedError(): unknown | undefined {
  const e = lastError;
  lastError = undefined;
  return e;
}

process.on("unhandledRejection", (reason) => {
  lastError = reason;
});
