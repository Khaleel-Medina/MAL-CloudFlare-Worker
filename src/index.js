export default {
  async fetch(request) {
    const url = new URL(request.url);

    const target = url.searchParams.get("url");
    if (!target) {
      return new Response("Missing url param", { status: 400 });
    }

    try {
      const response = await fetch(target, {
        headers: { "User-Agent": "MAL-Proxy" },
      });

      return new Response(response.body, {
        status: response.status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      return new Response("Proxy fetch failed: " + err.message, { status: 500 });
    }
  },
};
