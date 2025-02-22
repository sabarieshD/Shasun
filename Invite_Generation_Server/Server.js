const express = require('express');
const cors = require('cors');
const certificateRoutes = require('./Routes/Certificate_route');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 Server is running successfully on Vercel!');
});

app.use('/certificate', certificateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
