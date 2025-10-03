<script src="https://unpkg.com/elasticlunr/elasticlunr.js"></script>
<script>
async function buildIndex() {
  // Ambil sitemap
  const res = await fetch("/sitemap.xml");
  const xml = await res.text();

  // Ambil semua URL
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

  let docs = [];

  for (let url of urls) {
    try {
      const html = await fetch(url).then(r => r.text());

      // ambil <title>
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : url;

      // hapus semua tag HTML → ambil text saja
      const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');

      docs.push({ id: url, title, content: text, url });
    } catch (e) {
      console.warn("Gagal fetch:", url, e);
    }
  }

  // Buat index Lunr
  const index = elasticlunr(function () {
    this.addField('title');
    this.addField('content');
    this.setRef('id');
    docs.forEach(doc => this.addDoc(doc));
  });

  window.searchIndex = index;
  window.searchDocs = docs;
  console.log("Index siap, total:", docs.length);
}

// Jalankan
buildIndex();
</script>
