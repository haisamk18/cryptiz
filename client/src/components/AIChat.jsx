import { useState } from "react";
import axios from "axios";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function AIChat({
    riskScore
}) {

    const [response, setResponse] =
        useState("");

    async function askAI() {

        try {

            const result =
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/ai-analysis`,
                    {
                        riskScore
                    }
                );

            setResponse(
                result.data.answer
            );

        } catch {

            setResponse(
                "Unable to analyze wallet"
            );

        }

    }

    return (

        <motion.div
            initial={{
                opacity: 0,
                y: 30
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            className="
                bg-[#111111]/70
                backdrop-blur-xl
                border
                border-cyan-500/20
                rounded-3xl
                p-6
            "
        >

            <div
                className="
                    flex
                    items-center
                    gap-3
                    mb-5
                "
            >

                <Bot
                    className="
                        text-cyan-400
                    "
                />

                <h2
                    className="
                        text-xl
                        font-bold
                    "
                >
                    AI Security Assistant
                </h2>

            </div>

            <button
                onClick={askAI}
                className="
                    w-full
                    py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-purple-600
                    to-cyan-500
                    font-semibold
                "
            >
                Analyze Wallet Risk
            </button>

            {
                response && (

                    <div
                        className="
                            mt-5
                            bg-black/40
                            p-4
                            rounded-xl
                            border
                            border-cyan-500/20
                        "
                    >
                        {response}
                    </div>

                )
            }

        </motion.div>

    );

}