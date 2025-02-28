import { defineConfig } from '@adonisjs/static'

/**
 * Configuration options to tweak the static files middleware.
 * The complete set of options are documented on the
 * official documentation website.
 *
 * https://docs.adonisjs.com/guides/static-assets
 */
const staticServerConfig = defineConfig({
  enabled: true,
  etag: true,
  lastModified: true,
  dotFiles: 'ignore',
  cacheControl: true,
  maxAge: 60,
  headers: (path, stats) => {
    if (path.endsWith('.mc2')) {
      return {
        'content-type': 'application/octet-stream',
      }
    }
    return {}
  },
})

export default staticServerConfig
