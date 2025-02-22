const express = require('express');
const cors = require('cors');
const certificateRoutes = require('./Routes/Certificate_route');

const app = express();

// Configure CORS to allow specific origins
app.use(cors({
    origin: 'https://shasun-frontend.vercel.app/', // Change this to your frontend URL in production (e.g., 'https://yourfrontend.com')
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
    res.send('🚀 Server is running successfully on Vercel!');
});

// API Routes
app.use('/certificate', certificateRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌍 Visit: http://localhost:${PORT} to check the API`);
    console.log("🚀 Deployment successful! Backend is live.");
});
