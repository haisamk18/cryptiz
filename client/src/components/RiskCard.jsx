import { motion } from "framer-motion";

export default function RiskCard({
    title,
    value,
    color
}) {
    return (

        <motion.div
            initial={{
                opacity: 0,
                y: 50
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            whileHover={{
                y: -8,
                scale: 1.03
            }}
            transition={{
                duration: 0.5
            }}
            className="
                relative
                overflow-hidden
                bg-[#111111]/70
                backdrop-blur-lg
                border
                border-purple-500/20
                rounded-3xl
                p-6
                shadow-lg
            "
        >

            <div
                className="
                    absolute
                    w-24
                    h-24
                    bg-purple-500
                    opacity-10
                    blur-3xl
                    top-[-20px]
                    right-[-20px]
                "
            />

            <p
                className="
                    text-gray-400
                    text-sm
                    mb-2
                "
            >
                {title}
            </p>

            <h2
                className={`
                    text-3xl
                    font-bold
                    ${color}
                `}
            >
                {value}
            </h2>

        </motion.div>

    );
}