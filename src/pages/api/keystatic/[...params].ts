export const prerender = false;

import { makeHandler } from '@keystatic/astro/api';
import keystaticConfig from '../../../../keystatic.config';
import type { APIContext } from 'astro';

const handler = makeHandler({
  config: keystaticConfig,
  clientId: import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: import.meta.env.KEYSTATIC_SECRET,
});

/**
 * En Vercel, el servidor corre detrás de un proxy y `request.url`
 * tiene `localhost` como host en vez del dominio real.
 * Keystatic construye el redirect_uri con ese URL, lo que causa 404 en GitHub.
 * Este wrapper parchea el request con el host correcto via x-forwarded-host.
 */
export const all = async (context: APIContext) => {
  let { request } = context;

  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https';

  if (forwardedHost) {
    const url = new URL(request.url);
    const realHost = forwardedHost.split(',')[0].trim();
    const realProto = forwardedProto.split(',')[0].trim();

    if (url.hostname !== realHost) {
      url.hostname = realHost;
      url.protocol = realProto + ':';
      url.port = '';
      request = new Request(url.toString(), request);
    }
  }

  return handler({ ...context, request });
};
