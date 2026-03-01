import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Express Rest API endpoints to proxy requests to the backend service.
 */
app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch('https://zando-plus-backend-production.up.railway.app/api/products');
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const response = await fetch('https://zando-plus-backend-production.up.railway.app/api/categories');
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const response = await fetch('https://zando-plus-backend-production.up.railway.app/api/users');
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/login', express.json(), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hardcoded Admin Account
    if (email === 'admin@zandoplus.com' && password === 'admin123') {
      return res.json({
        uid: 'admin-001',
        name: 'Admin ZandoPlus',
        email: 'admin@zandoplus.com',
        role: 'Admin'
      });
    }

    const response = await fetch('https://zando-plus-backend-production.up.railway.app/api/users');
    const users = await response.json();
    
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      return res.json(user);
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Authentication failed' });
  }
});

app.post('/api/signup', express.json(), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // In a real scenario, we would POST to the actual backend
    // Since we don't have a known POST endpoint for users, we'll return a mock success
    // or try to POST to the same URL if it supports it.
    
    const newUser = {
      uid: Math.random().toString(36).substring(2, 15),
      name,
      email,
      role: 'User'
    };
    
    // Simulate a successful registration
    return res.json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ error: 'Registration failed' });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
