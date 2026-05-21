import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function Logo() {

    return (

        <div className="flex items-center gap-4">

            <div className="relative">

                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3
                    }}
                    className="
                        absolute
                        inset-0
                        rounded-full
                        bg-purple-500
                        blur-xl
                    "
                />

                <div
                    className="
                        relative
                        w-12
                        h-12
                        rounded-2xl
                        bg-gradient-to-br
                        from-purple-600
                        to-cyan-500
                        flex
                        items-center
                        justify-center
                        shadow-lg
                    "
                >

                    <Shield
                        size={24}
                        className="text-white"
                    />

                </div>

            </div>

            <div>

                <motion.h1
                    initial={{
                        opacity: 0,
                        x: -10
                    }}
                    animate={{
                        opacity: 1,
                        x: 0
                    }}
                    className="
                        text-3xl
                        font-black
                        tracking-wide
                    "
                >

                    <span
                        className="
                            bg-gradient-to-r
                            from-purple-400
                            via-purple-300
                            to-cyan-400
                            bg-clip-text
                            text-transparent
                        "
                    >
                        Cryptiz
                    </span>

                </motion.h1>

                <p
                    className="
                        text-xs
                        text-gray-400
                        tracking-[0.3em]
                    "
                >
                    WALLET SECURITY AI
                </p>

            </div>

        </div>

    );

}