const CANTEEN_URL =
  "https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json";

export async function fetchMenu() {
  const result = await fetch(CANTEEN_URL);
  if (!result.ok)
    throw new Error(`Fetching failed: ${result.status} ${result.statusText}`);
  return result.json();
}
