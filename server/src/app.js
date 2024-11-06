import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath from 'url' module
import router from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

// Use fileURLToPath to correctly resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Get the directory name

const staticAssetsPath = path.resolve(__dirname, '../assets');
console.log("Static assets path:", staticAssetsPath);  // Debug output

// Serve static files from the assets folder
app.use('/assets', express.static(staticAssetsPath));

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
