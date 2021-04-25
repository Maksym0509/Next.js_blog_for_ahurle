import * as globals from "@/helpers/globals"
import fs from "fs"

// unknown in dev mode, don't want to bother shelling out
const COMMIT_SHA =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
  null

const ENV =
  process.env.VERCEL_ENV ||
  (process.env.NODE_ENV === "test" && "test") ||
  "development"

const DISABLED_SENTRY_ENVS: typeof ENV[] = ["development", "test"]

const SENTRY_CONFIG = {
  release: COMMIT_SHA,
  environment: ENV,
  // Setting dsn to an empty string disables reporting - figured this is more realistic
  // in dev mode than removing the scripts entirely.
  // Remove if you want to report exceptions in dev/test.
  ...(DISABLED_SENTRY_ENVS.includes(ENV) ? { dsn: "" } : {}),
}

/**
 * This file is a copy of https://js.sentry-cdn.com/aacf3f04ba9b4c3594a77b95e9bad106.min.js
 * I'm using the lazy-load technique and hosting it myself for performance reasons:
 *   https://docs.sentry.io/platforms/javascript/install/lazy-load-sentry/
 *
 * Note that the SDK version and DSN is contained in this file so you'll need to keep it updated.
 * The runtime: browser thing mimics the sentry next.js SDK.
 */
const SENTRY_SCRIPT = `
${fs.readFileSync("./vendor/sentry-loader.min.js")}
Sentry.onLoad(function() {
  Sentry.init(${JSON.stringify(SENTRY_CONFIG)});
  Sentry.configureScope(function(scope) {
    scope.setTag("runtime", "browser");
  });
});
`

export const SentryLoader: React.FC = () => {
  /**
   * siteName check is to protect against forks forgetting to change the vendored file,
   * since it contains my personal DSN, i.e. API key, which must be public data but I don't
   * want people to dump their errors into my project.
   */
  if (globals.siteName !== "ahurle.dev") return null

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: SENTRY_SCRIPT }} />
}
