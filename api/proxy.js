export default async function handler(req, res) {
    // Config
    const NVIDIA_API_KEY = process.env.VITE_NVIDIA_API_KEY;
    const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

    // Set CORS headers for the response
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (!NVIDIA_API_KEY) {
        return res.status(500).json({ error: "Server API Key configuration missing" });
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // req.body is already parsed by Vercel for JSON
        const body = req.body;

        const backendResponse = await fetch(NVIDIA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${NVIDIA_API_KEY}`
            },
            body: JSON.stringify(body)
        });

        const data = await backendResponse.json();

        if (!backendResponse.ok) {
            return res.status(backendResponse.status).json(data);
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error("Proxy Error:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
