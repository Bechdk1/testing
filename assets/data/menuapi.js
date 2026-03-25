const CANTEEN_URL =
  "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json";

/**
 * Fetches the weekly canteen menu from the TechCollege API.
 * @returns {Promise<{Week: number, Days: {DayName: string, Dish: string}[]}>}
 */
export async function fetchMenu() {
  const result = await fetch(CANTEEN_URL);
  if (!result.ok)
    throw new Error(`Fetching failed: ${result.status} ${result.statusText}`);
  return result.json();
}
