const express = require('express');
const router = express.Router();
const CertificateController = require('../Controller/Certificate_controller');

router.post('/generate-certificate', async (req, res) => {
    try {
        console.log("📥 Incoming request data:", req.body);
        const result = await CertificateController.generateCertificate(req.body);
        res.status(200).json({ message: '✅ Certificate generated', data: result });
    } catch (error) {
        console.error("❌ Error in /generate-certificate:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

module.exports = router;
