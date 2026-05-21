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
            },
            {
                token: "UNI",
                contract: "DEX Aggregator",
                risk: "Medium",
                unlimited: false
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
    try {

        const { riskScore } =
            req.body;

        let analysis = "";

        if (riskScore >= 70) {

            analysis =
                "High wallet risk detected. Unlimited token approvals and suspicious interactions may expose funds to theft.";

        } else if (riskScore >= 40) {

            analysis =
                "Moderate risk detected. Review approvals and unknown token activity.";

        } else {

            analysis =
                "Wallet appears relatively safe. Continue monitoring activity.";

        }

        res.json({
            answer: analysis
        });

    } catch {

        res.status(500).json({
            answer:
                "Analysis failed"
        });

    }
});

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on ${PORT}`
    );

});