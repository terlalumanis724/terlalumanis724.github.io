export default {
  async fetch(request, env) {
    const zoneId = "juHQEuclG1tLGb6fJKLkcGH0xQp_2vWRlOLUvAME"; // ganti dengan Zone ID domain
    const apiToken = env.CF_API_TOKEN; // nanti kita simpan sebagai secret

    const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?per_page=9999`;

    const res = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    const domains = data.result
      .filter(r => ["A", "CNAME"].includes(r.type))
      .map(r => r.name);

    return new Response(JSON.stringify({ sites: domains }, null, 2), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
