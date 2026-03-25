const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

const CANTEEN_URL =
  "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json";

/**
 * Fetches the canteen menu.
 * Uses canteen.json locally, and calls the API directly in production
 * (the screen browser runs on the school network and can reach it).
 * @returns {Promise<{Week: number, Days: {DayName: string, Dish: string}[]}>}
 */
export async function fetchMenu() {
  const url = isLocal ? "/canteen.json" : CANTEEN_URL;
  const result = await fetch(url);
  if (!result.ok)
    throw new Error(`Fetching failed: ${result.status} ${result.statusText}`);
  return result.json();
}
