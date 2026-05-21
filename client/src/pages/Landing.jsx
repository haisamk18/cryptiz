import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import MetaMaskNotice from "../components/MetaMaskNotice";
import Logo from "../components/Logo";

export default function Landing() {

    const navigate = useNavigate();

    return (

        <div
            className="
                min-h-screen
                bg-black
                text-white
                overflow-hidden
                relative
            "
        >

            <div
                className="
                    absolute
                    w-[500px]
                    h-[500px]
                    bg-purple-600
                    blur-[150px]
                    opacity-20
                    top-[-100px]
                    left-[-100px]
                "
            />

            <div
                className="
                    absolute
                    w-[500px]
                    h-[500px]
                    bg-cyan-500
                    blur-[150px]
                    opacity-20
                    bottom-[-100px]
                    right-[-100px]
                "
            />

            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-8
                    pt-10
                    relative
                    z-10
                "
            >

                <Logo />

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 1
                    }}
                    className="mt-24"
                >

                    <h1
                        className="
                            text-6xl
                            font-bold
                            leading-tight
                        "
                    >

                        Protect Your Wallet

                        <br />

                        <span
                            className="
                                bg-gradient-to-r
                                from-purple-500
                                to-cyan-400
                                bg-clip-text
                                text-transparent
                            "
                        >
                            Before Threats Reach It
                        </span>

                    </h1>

                    <p
                        className="
                            mt-8
                            text-gray-400
                            text-xl
                            max-w-3xl
                        "
                    >
                        AI-powered wallet scanning,
                        suspicious contract detection,
                        approval monitoring,
                        and real-time security analysis.
                    </p>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="
                            mt-10
                            px-8
                            py-4
                            rounded-full
                            bg-gradient-to-r
                            from-purple-600
                            to-cyan-500
                            flex
                            items-center
                            gap-3
                            font-bold
                            hover:scale-105
                            transition
                        "
                    >

                        Launch App

                        <ArrowRight />

                    </button>

                    <MetaMaskNotice />

                </motion.div>

            </div>

        </div>

    );

}