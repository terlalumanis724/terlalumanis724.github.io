export async function onRequest(context) {
  const zoneId = "juHQEuclG1tLGb6fJKLkcGH0xQp_2vWRlOLUvAME"; // Ganti dengan Zone ID domain kamu
  const apiToken = context.env.CF_API_TOKEN; // Tambahkan secret di Pages

  const url = `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?per_page=100`;

  try {
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

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
