// Production Server for Next.js on GoDaddy
// GoDaddy के लिए Next.js Production Server

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

console.log(`Starting server in ${dev ? 'development' : 'production'} mode...`);
console.log(`Server will run on port: ${port}`);

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Log requests (optional - remove in production if not needed)
      if (dev) {
        console.log(`${req.method} ${pathname}`);
      }

      // Handle all requests
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling request:', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  })
    .listen(port, (err) => {
      if (err) throw err;
      console.log(`✅ Server ready on http://${hostname}:${port}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV}`);
      console.log(`📡 API URL: ${process.env.NEXT_PUBLIC_API_URL}`);
    })
    .on('error', (err) => {
      console.error('❌ Server error:', err);
      process.exit(1);
    });
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});



