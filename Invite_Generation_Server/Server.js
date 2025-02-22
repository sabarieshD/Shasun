const express = require('express');
const cors = require('cors');
const certificateRoutes = require('./Routes/Certificate_route');

const app = express();

// ✅ Configure CORS properly
const corsOptions = {
    origin: ['*'], // Allow frontend domain
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 Server is running successfully on Vercel!');
});

app.use('/certificate', certificateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌍 Visit: http://localhost:${PORT} to check the API`);
    console.log("🚀 Deployment successful! Backend is live.");
});
