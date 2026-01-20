import app from '../app.js';

export function healthCheck() {
    app.get('/health', (req, res) => {
        res.json({ status: "ok" });
    });
}
