const CANTEEN_URL =
  "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json";

/**
 * Netlify serverless function that proxies the canteen menu API.
 * Avoids CORS by fetching server-side and forwarding the response.
 */
export default async function handler(req, context) {
  const response = await fetch(CANTEEN_URL);

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: `Upstream error: ${response.status}` }),
      { status: response.status, headers: { "Content-Type": "application/json" } }
    );
  }

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
