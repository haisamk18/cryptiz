import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

export default function ApprovalList({
    approvals
}) {

    return (

        <motion.div
            initial={{
                opacity: 0,
                x: 30
            }}
            animate={{
                opacity: 1,
                x: 0
            }}
            className="
                bg-[#111111]/70
                backdrop-blur-xl
                border
                border-red-500/20
                rounded-3xl
                p-6
            "
        >

            <div className="flex gap-3 mb-6">

                <ShieldAlert
                    className="
                        text-red-400
                    "
                />

                <h2
                    className="
                        text-xl
                        font-bold
                    "
                >
                    Active Approvals
                </h2>

            </div>

            {
                approvals.map(
                    (
                        approval,
                        index
                    ) => (

                        <motion.div
                            key={index}
                            whileHover={{
                                y: -3
                            }}
                            className="
                                bg-black/40
                                rounded-xl
                                p-4
                                mb-4
                                border
                                border-white/5
                            "
                        >

                            <div
                                className="
                                    flex
                                    justify-between
                                "
                            >

                                <div>

                                    <p className="font-semibold">
                                        {approval.token}
                                    </p>

                                    <p
                                        className="
                                            text-gray-400
                                            text-sm
                                        "
                                    >
                                        {approval.contract}
                                    </p>

                                </div>

                                <div
                                    className="
                                        text-red-400
                                    "
                                >
                                    {approval.risk}
                                </div>

                            </div>

                            <button
                                className="
                                    mt-4
                                    w-full
                                    py-2
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-red-500
                                    to-orange-500
                                    font-semibold
                                "
                            >
                                Revoke Approval
                            </button>

                        </motion.div>

                    )
                )
            }

        </motion.div>

    );

}