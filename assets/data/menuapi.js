const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
const menuURL = isLocal ? "/canteen.json" : "/.netlify/functions/menu";

/**
 * Fetches the canteen menu.
 * Uses canteen.json locally and the Netlify proxy function in production.
 * @returns {Promise<{Week: number, Days: {DayName: string, Dish: string}[]}>}
 */
export async function fetchMenu() {
  const result = await fetch(menuURL);
  if (!result.ok)
    throw new Error(`Fetching failed: ${result.status} ${result.statusText}`);
  return result.json();
}
