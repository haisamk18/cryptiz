const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(
    process.env.ALCHEMY_URL
);

/* Health route */
app.get("/", (req, res) => {
    res.json({
        status: "running",
        app: "Cryptiz Backend",
        message: "Backend deployed successfully"
    });
});

app.post("/scan-wallet", async (req, res) => {
    try {

        const { walletAddress } = req.body;

        const balanceWei =
            await provider.getBalance(
                walletAddress
            );

        const balanceEth =
            ethers.formatEther(
                balanceWei
            );

        const approvals = [
            {
                token: "USDT",
                contract: "UnknownSwap Router",
                risk: "High",
                unlimited: true
            }
        ];

        res.json({
            success: true,
            walletAddress,
            totalAssets:
                `${Number(balanceEth).toFixed(4)} ETH`,
            riskScore: 68,
            activeApprovals: approvals.length,
            riskyTokens: [
                {
                    token: "FREEETH",
                    reason: "Dusting attack"
                }
            ],
            approvals,
            tokens: []
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false
        });

    }
});

app.post("/ai-analysis", async (req, res) => {

    const { riskScore } = req.body;

    let answer = "";

    if (riskScore >= 70) {

        answer =
            "High risk detected due to suspicious approvals and wallet activity.";

    } else {

        answer =
            "Wallet currently shows moderate to low risk.";

    }

    res.json({
        answer
    });

});

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on ${PORT}`
    );

});