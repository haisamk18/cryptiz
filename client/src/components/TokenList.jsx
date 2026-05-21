export default function TokenList({
    tokens
}) {
    return (

        <div className="bg-[#151515] p-6 rounded-xl">

            <h3 className="text-xl font-bold mb-5">
                Wallet Tokens
            </h3>

            {
                tokens.length === 0
                ? (
                    <p className="text-gray-400">
                        No tokens found
                    </p>
                )
                : (
                    tokens.map(
                        (
                            token,
                            index
                        ) => (

                            <div
                                key={index}
                                className="border-b border-gray-700 py-4"
                            >

                                <p className="font-semibold">

                                    {token.name}

                                </p>

                                <p className="text-sm text-gray-400 break-all">

                                    {token.contract}

                                </p>

                                <p className="text-green-400 mt-2">

                                    Balance:
                                    {" "}
                                    {token.balance}

                                </p>

                            </div>

                        )
                    )
                )
            }

        </div>

    );
}