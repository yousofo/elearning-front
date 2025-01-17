export const fetchCache = 'force-no-store';

import cities from "./cities.json"

export async function GET(request) {
  return new Response(JSON.stringify(cities), {
    headers: {
      'Content-Type': 'application/json',
    }
  });
}