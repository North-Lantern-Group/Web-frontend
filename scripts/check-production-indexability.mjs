const productionUrl = "https://www.northlanterngroup.com/";

const response = await fetch(productionUrl, { method: "HEAD", redirect: "follow" });

if (!response.ok) {
  throw new Error(`Production indexability check failed: ${productionUrl} returned ${response.status}`);
}

const robotsTag = response.headers.get("x-robots-tag") ?? "";

if (/\bnoindex\b/i.test(robotsTag)) {
  throw new Error(`Production root is serving X-Robots-Tag: ${robotsTag}`);
}

console.log("Production root indexability check passed.");
