import { useState } from "react";
import axios from "axios";

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

        <div className="bg-[#151515] p-6 rounded-xl">

            <h3 className="text-xl font-bold mb-4">

                AI Security Assistant

            </h3>

            <button
                onClick={askAI}
                className="bg-blue-600 px-4 py-2 rounded"
            >
                Analyze Wallet
            </button>

            {
                response && (

                    <div className="mt-5 p-4 bg-[#222] rounded">

                        {response}

                    </div>

                )
            }

        </div>

    );
}