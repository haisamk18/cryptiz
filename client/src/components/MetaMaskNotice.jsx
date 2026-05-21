import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function MetaMaskNotice() {
    const installed =
        typeof window !== "undefined" &&
        window.ethereum;

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -30
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.7
            }}
            className="
                bg-[#151515]/70
                border
                border-purple-500/30
                backdrop-blur-lg
                rounded-2xl
                p-5
                mt-8
            "
        >
            <div className="flex gap-3">

                <AlertTriangle
                    className="text-yellow-400"
                />

                <div>

                    <p className="font-bold">
                        Wallet Requirement
                    </p>

                    <p className="text-gray-400 mt-2">
                        {
                            installed
                                ? "MetaMask detected. You can securely launch Cryptiz."
                                : "MetaMask is required before scanning wallets. Install MetaMask before continuing."
                        }
                    </p>

                </div>

            </div>

        </motion.div>
    );
}