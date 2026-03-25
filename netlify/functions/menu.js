const CANTEEN_URL =
  "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json";

/**
 * Netlify proxy function for the canteen menu API.
 * Adds Referer and User-Agent headers to mimic a browser request
 * from within the school's own infoskærm system.
 */
export default async function handler(req, context) {
  const response = await fetch(CANTEEN_URL, {
    headers: {
      "Referer": "https://infoskaerm.techcollege.dk/",
      "Origin": "https://infoskaerm.techcollege.dk",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

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
