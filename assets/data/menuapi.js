const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

const CANTEEN_URL =
  "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json";

/**
 * Fetches the canteen menu.
 * - Local dev: returns mock data from canteen.json
 * - School network: fetches the API directly from the browser
 * - Outside school network: falls back to the Netlify proxy function
 * @returns {Promise<{Week: number, Days: {DayName: string, Dish: string}[]}>}
 */
export async function fetchMenu() {
  if (isLocal) {
    const result = await fetch("/canteen.json");
    if (!result.ok)
      throw new Error(`Mock fetch failed: ${result.status} ${result.statusText}`);
    return result.json();
  }

  try {
    const result = await fetch(CANTEEN_URL);
    if (!result.ok) throw new Error(`Direct fetch failed: ${result.status}`);
    return result.json();
  } catch {
    const result = await fetch("/.netlify/functions/menu");
    if (!result.ok)
      throw new Error(`Proxy fetch failed: ${result.status} ${result.statusText}`);
    return result.json();
  }
}
