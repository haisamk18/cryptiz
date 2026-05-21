export default function ApprovalList({
    approvals
}) {
    return (

        <div className="bg-[#151515] p-6 rounded-xl">

            <h3 className="text-xl font-bold mb-5">

                Active Approvals

            </h3>

            {
                approvals.map(
                    (
                        approval,
                        index
                    ) => (

                        <div
                            key={index}
                            className="border-b border-gray-700 py-4"
                        >

                            <p className="font-semibold">

                                {approval.token}

                            </p>

                            <p className="text-sm text-gray-400">

                                {approval.contract}

                            </p>

                            <p className="mt-2 text-red-400">

                                Risk:
                                {" "}
                                {approval.risk}

                            </p>

                            {
                                approval.unlimited &&
                                (
                                    <p className="text-yellow-500 text-sm">

                                        Unlimited Approval Detected

                                    </p>
                                )
                            }

                            <a
                                href="https://revoke.cash"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block mt-3 bg-red-600 px-3 py-2 rounded"
                            >
                                Revoke
                            </a>

                        </div>
                    )
                )
            }

        </div>

    );
}