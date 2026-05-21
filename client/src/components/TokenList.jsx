import { motion } from "framer-motion";
import { Coins } from "lucide-react";

export default function TokenList({ tokens }) {

    return (

        <motion.div
            initial={{
                opacity: 0,
                x: -30
            }}
            animate={{
                opacity: 1,
                x: 0
            }}
            className="
                bg-[#111111]/70
                backdrop-blur-xl
                border
                border-purple-500/20
                rounded-3xl
                p-6
            "
        >

            <div className="flex items-center gap-3 mb-6">

                <Coins
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
                    Wallet Tokens
                </h2>

            </div>

            {
                tokens.length > 0 ? (

                    tokens.map((token, index) => (

                        <motion.div
                            key={index}
                            whileHover={{
                                scale: 1.02
                            }}
                            className="
                                bg-black/40
                                rounded-xl
                                p-4
                                mb-3
                                border
                                border-white/5
                                flex
                                justify-between
                                items-center
                            "
                        >

                            <div>

                                <p className="font-semibold">
                                    {token.symbol}
                                </p>

                                <p
                                    className="
                                        text-sm
                                        text-gray-400
                                    "
                                >
                                    {token.name}
                                </p>

                            </div>

                            <div
                                className="
                                    px-3
                                    py-1
                                    rounded-full
                                    bg-cyan-500/20
                                    text-cyan-400
                                "
                            >
                                {token.balance}
                            </div>

                        </motion.div>

                    ))

                ) : (

                    <div
                        className="
                            text-center
                            py-8
                            text-gray-500
                        "
                    >
                        No tokens found
                    </div>

                )
            }

        </motion.div>

    );

}