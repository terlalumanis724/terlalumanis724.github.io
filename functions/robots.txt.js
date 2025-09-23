export async function onRequestGet(context) {
  const host = context.request.headers.get("host");
  return new Response(
`User-agent: *
Allow: /

Sitemap: https://${host}/sitemap.xml
Sitemap: https://${host}/feed.xml
`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
