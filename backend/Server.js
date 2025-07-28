// server.js
require('dotenv').config()
const http = require('http');
const app = require('./app');


const PORT = process.env.PORT || 5000;

    // Start the server
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    })

