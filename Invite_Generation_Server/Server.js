const express = require('express');
const cors = require('cors');
const certificateRoutes = require('./Routes/Certificate_route');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/certificate', certificateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
