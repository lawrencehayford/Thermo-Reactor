import config from "../constants/Config";

export default async function fetchReactorData(reactorIdSet) {
  const reactorIds = Array.from(reactorIdSet);
  const response = await fetch(`${config.baseUrl}/fetch_data`, {
    method: "POST",
    body: JSON.stringify({
      reactorIds
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    return response.statusText;
  }

  const json = await response.json();
  return json;
}
