export async function onRequestGet(context) {
  const host = context.request.headers.get("host");

  // Daftar sitemap yang mau diping
  const sitemaps = [
    `https://${host}/sitemap.xml`,
    `https://${host}/feed.xml`
  ];

  // Daftar mesin pencari
  const searchEngines = [
    "https://www.google.com/ping?sitemap=",
    "https://www.bing.com/ping?sitemap="
  ];

  let results = [];

  for (let sitemap of sitemaps) {
    for (let engine of searchEngines) {
      try {
        const url = engine + encodeURIComponent(sitemap);
        const res = await fetch(url);
        results.push(`${url} → ${res.status}`);
      } catch (err) {
        results.push(`${engine}${sitemap} → ERROR`);
      }
    }
  }

  return new Response(
    "Ping Results:\n" + results.join("\n"),
    { headers: { "Content-Type": "text/plain; charset=UTF-8" } }
  );
}

