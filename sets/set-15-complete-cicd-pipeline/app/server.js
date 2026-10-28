// Pure Node.js Web Server (Zero external dependencies)
// Runs out of the box on any Node runtime without npm install

const http = require('http');

const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || 'v1.0.0';
const ENVIRONMENT = process.env.APP_ENV || 'Production';

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevOps CI/CD Lab Demo</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        body { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .card { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 40px; max-width: 650px; width: 100%; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4); }
        .badge { display: inline-block; padding: 6px 14px; background: #3b82f6; color: white; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
        h1 { font-size: 2rem; margin-bottom: 12px; color: #ffffff; }
        p.subtitle { color: #94a3b8; font-size: 1.05rem; margin-bottom: 24px; line-height: 1.5; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .info-box { background: rgba(15, 23, 42, 0.6); padding: 16px; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.05); }
        .info-box h3 { font-size: 0.8rem; text-transform: uppercase; color: #64748b; margin-bottom: 6px; }
        .info-box p { font-size: 1.15rem; font-weight: 600; color: #38bdf8; }
        .pipeline-flow { background: rgba(15, 23, 42, 0.8); border-radius: 10px; padding: 18px; border: 1px solid #334155; }
        .pipeline-flow h4 { font-size: 0.9rem; margin-bottom: 10px; color: #cbd5e1; }
        .stages { display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: #94a3b8; }
        .stage { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .stage-icon { width: 36px; height: 36px; border-radius: 50%; background: #0284c7; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; }
        .arrow { color: #475569; font-size: 1.2rem; }
    </style>
</head>
<body>
    <div class="card">
        <span class="badge">Agile & DevOps Lab — Set 15</span>
        <h1>Kubernetes Continuous Deployment</h1>
        <p class="subtitle">Complete automated CI/CD pipeline built with GitHub, Jenkins, Docker, and Kubernetes.</p>
        
        <div class="grid">
            <div class="info-box">
                <h3>Application Version</h3>
                <p>${APP_VERSION}</p>
            </div>
            <div class="info-box">
                <h3>Cluster Environment</h3>
                <p>${ENVIRONMENT}</p>
            </div>
            <div class="info-box">
                <h3>Container Port</h3>
                <p>Port ${PORT}</p>
            </div>
            <div class="info-box">
                <h3>Health Status</h3>
                <p style="color: #4ade80;">Active / Healthy</p>
            </div>
        </div>

        <div class="pipeline-flow">
            <h4>Automated Pipeline Stages:</h4>
            <div class="stages">
                <div class="stage"><div class="stage-icon">Git</div><span>GitHub</span></div>
                <span class="arrow">&rarr;</span>
                <div class="stage"><div class="stage-icon">CI</div><span>Jenkins</span></div>
                <span class="arrow">&rarr;</span>
                <div class="stage"><div class="stage-icon">Doc</div><span>Docker</span></div>
                <span class="arrow">&rarr;</span>
                <div class="stage"><div class="stage-icon">K8s</div><span>Kubernetes</span></div>
            </div>
        </div>
    </div>
</body>
</html>`;

const server = http.createServer((req, res) => {
    const pathname = (req.url || '/').split('?')[0];

    // Healthcheck endpoint for Kubernetes probes
    if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'UP',
            timestamp: new Date().toISOString(),
            version: APP_VERSION,
            environment: ENVIRONMENT
        }));
        return;
    }

    // Main web page
    if (pathname === '/' || pathname === '') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(htmlContent);
        return;
    }

    // 404 handler
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
});

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT} [Version: ${APP_VERSION}, Env: ${ENVIRONMENT}]`);
    });
}

module.exports = server;
