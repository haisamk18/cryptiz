import { useEffect, useState } from "react";
import { Shield, Wallet } from "lucide-react";
import { ethers } from "ethers";
import axios from "axios";

import RiskCard from "../components/RiskCard";
import TokenList from "../components/TokenList";
import ApprovalList from "../components/ApprovalList";
import AIChat from "../components/AiChat";

export default function Dashboard() {
    const [walletAddress, setWalletAddress] = useState("");
    const [scanData, setScanData] = useState(null);

    async function scanWallet(address) {
        try {
            const response = await axios.post(
                "http://localhost:5000/scan-wallet",
                {
                    walletAddress: address
                }
            );

            setScanData(response.data);

        } catch (error) {
            console.log("Scan error:", error);
        }
    }

    async function connectWallet() {
        try {
            if (!window.ethereum) {
                alert("Please install MetaMask");
                return;
            }

            await window.ethereum.request({
                method: "eth_requestAccounts"
            });

            const provider =
                new ethers.BrowserProvider(
                    window.ethereum
                );

            const signer =
                await provider.getSigner();

            const address =
                await signer.getAddress();

            setWalletAddress(address);

            scanWallet(address);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function loadWallet() {
            try {
                if (!window.ethereum) return;

                const accounts =
                    await window.ethereum.request({
                        method: "eth_accounts"
                    });

                if (accounts.length > 0) {
                    setWalletAddress(
                        accounts[0]
                    );

                    scanWallet(
                        accounts[0]
                    );
                }

            } catch (error) {
                console.log(error);
            }
        }

        loadWallet();

    }, []);

    return (
        <div className="min-h-screen">

            <nav className="border-b border-gray-800 p-5 flex justify-between items-center">

                <div className="flex items-center gap-3">

                    <Shield size={28} />

                    <h1 className="text-2xl font-bold">
                        Cryptiz
                    </h1>

                </div>

                <button
                    onClick={connectWallet}
                    className="bg-blue-600 px-5 py-2 rounded-lg flex items-center gap-2"
                >
                    <Wallet size={18} />

                    {walletAddress
                        ? `${walletAddress.slice(
                              0,
                              6
                          )}...${walletAddress.slice(-4)}`
                        : "Connect Wallet"}
                </button>

            </nav>

            <div className="p-8">

                <h2 className="text-3xl font-bold mb-8">
                    Security Dashboard
                </h2>

                {scanData && (
                    <>
                        <div className="grid md:grid-cols-4 gap-6">

                            <RiskCard
                                title="Risk Score"
                                value={`${scanData.riskScore}/100`}
                                color="text-red-500"
                            />

                            <RiskCard
                                title="Assets"
                                value={scanData.totalAssets}
                                color="text-green-500"
                            />

                            <RiskCard
                                title="Approvals"
                                value={scanData.activeApprovals}
                                color="text-yellow-500"
                            />

                            <RiskCard
                                title="Risk Tokens"
                                value={scanData.riskyTokens.length}
                                color="text-orange-500"
                            />

                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">

                            <div className="bg-[#151515] p-6 rounded-xl">

                                <h3 className="text-xl font-bold mb-5">
                                    Suspicious Tokens
                                </h3>

                                {scanData.riskyTokens.map(
                                    (token, index) => (
                                        <div
                                            key={index}
                                            className="border-b border-gray-700 py-3"
                                        >
                                            <p className="font-semibold">
                                                {token.token}
                                            </p>

                                            <p className="text-gray-400 text-sm">
                                                {token.reason}
                                            </p>
                                        </div>
                                    )
                                )}

                            </div>

                            <div className="bg-[#151515] p-6 rounded-xl">

                                <h3 className="text-xl font-bold mb-5">
                                    Risky Contracts
                                </h3>

                                <div className="border-b border-gray-700 py-3">

                                    <p className="font-semibold">
                                        UnknownSwap Router
                                    </p>

                                    <p className="text-red-500">
                                        High Risk
                                    </p>

                                </div>

                                <div className="border-b border-gray-700 py-3">

                                    <p className="font-semibold">
                                        FakeAirdrop Contract
                                    </p>

                                    <p className="text-red-500">
                                        Critical
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">

                                <TokenList
                                    tokens={scanData.tokens || []}
                                />

                                <ApprovalList
                                    approvals={scanData.approvals || []}
                                />

                                 <AIChat
                                     riskScore={
                                                        scanData?.riskScore || 0
                                                    }
                                />


                        </div>      

                    </>
                )}

            </div>

        </div>
    );
}