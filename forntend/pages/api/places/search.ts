import type { NextApiRequest, NextApiResponse } from "next";
import https from "https";

function httpsPost(url: string, body: string, headers: Record<string, string>): Promise<string> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
        ...headers,
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  const { query } = req.query;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ message: "query is required" });
  }

  const apiKey = process.env.GOOGLE_PLACE_API;
  if (!apiKey) {
    return res.status(500).json({ message: "GOOGLE_PLACE_API not set in .env.local" });
  }

  try {
    const body = JSON.stringify({ textQuery: query });

    const raw = await httpsPost(
      "https://places.googleapis.com/v1/places:searchText",
      body,
      {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.rating,places.types",
      }
    );

    const data = JSON.parse(raw);

    if (data.error) {
      return res.status(403).json({
        message: `Google API error: ${data.error.message || data.error.status}`,
      });
    }

    const results = (data.places || []).slice(0, 6).map((place: {
      id: string;
      displayName?: { text: string };
      formattedAddress?: string;
      rating?: number;
      types?: string[];
    }) => ({
      placeId:  place.id,
      name:     place.displayName?.text ?? "",
      address:  place.formattedAddress ?? "",
      rating:   place.rating ?? 0,
      category: place.types?.[0]?.replace(/_/g, " ") ?? "",
    }));

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({
      message: `Server error: ${err instanceof Error ? err.message : "unknown"}`,
    });
  }
}
