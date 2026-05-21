import { useEffect, useState } from "react";
import { Wallet, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import axios from "axios";

import Logo from "../components/Logo";
import RiskCard from "../components/RiskCard";
import TokenList from "../components/TokenList";
import ApprovalList from "../components/ApprovalList";
import AIChat from "../components/AIChat";

export default function Dashboard() {

    const [walletAddress, setWalletAddress] =
        useState("");

    const [scanData, setScanData] =
        useState(null);

    async function scanWallet(address) {

        try {

            const response =
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/scan-wallet`,
                    {
                        walletAddress: address
                    }
                );

            setScanData(
                response.data
            );

        } catch (error) {

            console.log(
                "Scan error:",
                error
            );

        }

    }

    async function connectWallet() {

        try {

            if (!window.ethereum) {

                alert(
                    "Please install MetaMask"
                );

                return;

            }

            await window.ethereum.request({
                method: "wallet_requestPermissions",
                params: [
                    {
                        eth_accounts: {}
                    }
                ]
            });

            const provider =
                new ethers.BrowserProvider(
                    window.ethereum
                );

            const signer =
                await provider.getSigner();

            const address =
                await signer.getAddress();

            setWalletAddress(
                address
            );

            scanWallet(
                address
            );

        } catch (error) {

            console.log(error);

        }

    }

    function disconnectWallet() {

        setWalletAddress("");

        setScanData(null);

    }

    useEffect(() => {

        async function loadWallet() {

            try {

                if (!window.ethereum)
                    return;

                const accounts =
                    await window.ethereum.request({
                        method: "eth_accounts"
                    });

                if (
                    accounts.length > 0
                ) {

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

        <div
            className="
                min-h-screen
                bg-black
                text-white
            "
        >

            <nav
                className="
                    flex
                    justify-between
                    items-center
                    px-8
                    py-5
                    border-b
                    border-white/10
                    backdrop-blur-lg
                "
            >

                <Logo />

                <div
                    className="
                        flex
                        items-center
                        gap-4
                    "
                >

                    <button
                        onClick={connectWallet}
                        className="
                            bg-gradient-to-r
                            from-purple-600
                            to-cyan-500
                            px-5
                            py-3
                            rounded-full
                            flex
                            items-center
                            gap-2
                            hover:scale-105
                            transition
                        "
                    >

                        <Wallet size={18} />

                        {
                            walletAddress
                            ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}`
                            : "Connect Wallet"
                        }

                    </button>

                    {
                        walletAddress && (

                            <button
                                onClick={disconnectWallet}
                                className="
                                    bg-red-500/20
                                    border
                                    border-red-500/30
                                    px-5
                                    py-3
                                    rounded-full
                                    flex
                                    items-center
                                    gap-2
                                    hover:bg-red-500/30
                                    transition
                                "
                            >

                                <LogOut size={18} />

                                Disconnect

                            </button>

                        )
                    }

                </div>

            </nav>

            <div className="p-8">

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 20
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    className="
                        text-4xl
                        font-bold
                        mb-8
                    "
                >
                    Wallet Security Dashboard
                </motion.h1>

                {
                    !walletAddress && (

                        <div
                            className="
                                bg-[#111111]
                                rounded-3xl
                                p-12
                                text-center
                                border
                                border-purple-500/20
                            "
                        >

                            <h2
                                className="
                                    text-2xl
                                    font-bold
                                "
                            >
                                Connect a wallet
                            </h2>

                            <p
                                className="
                                    text-gray-400
                                    mt-3
                                "
                            >
                                Scan your wallet for
                                approvals, suspicious
                                tokens and risks.
                            </p>

                        </div>

                    )
                }

                {
                    walletAddress &&
                    scanData && (

                        <>

                            <div className="grid md:grid-cols-4 gap-6">

                                <RiskCard
                                    title="Risk Score"
                                    value={`${scanData.riskScore}/100`}
                                    color="text-red-400"
                                />

                                <RiskCard
                                    title="Assets"
                                    value={scanData.totalAssets}
                                    color="text-green-400"
                                />

                                <RiskCard
                                    title="Approvals"
                                    value={scanData.activeApprovals}
                                    color="text-yellow-400"
                                />

                                <RiskCard
                                    title="Risk Tokens"
                                    value={scanData.riskyTokens.length}
                                    color="text-orange-400"
                                />

                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mt-8">

                                <TokenList
                                    tokens={scanData.tokens || []}
                                />

                                <ApprovalList
                                    approvals={scanData.approvals || []}
                                />

                            </div>

                            <div className="mt-8">

                                <AIChat
                                    riskScore={
                                        scanData.riskScore
                                    }
                                />

                            </div>

                        </>

                    )
                }

            </div>

        </div>
    );

}