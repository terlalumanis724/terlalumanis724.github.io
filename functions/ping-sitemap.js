export async function onRequestGet(context) {
  const host = context.request.headers.get("host");
  const sitemapUrl = `https://${host}/sitemap.xml`;

  const engines = [
    `https://www.google.com/ping?sitemap=${sitemapUrl}`,
    `https://www.bing.com/ping?sitemap=${sitemapUrl}`,
    // Yandex ping (lebih baik juga submit via Yandex Webmaster Tools)
    `https://webmaster.yandex.com/site/map.xml?host=${sitemapUrl}`
  ];

  let results = [];
  for (const url of engines) {
    try {
      const res = await fetch(url);
      results.push({ url, status: res.status });
    } catch (err) {
      results.push({ url, error: err.toString() });
    }
  }

  return new Response(JSON.stringify({ pinged: results }, null, 2), {
    headers: { "Content-Type": "application/json; charset=UTF-8" }
  });
}
