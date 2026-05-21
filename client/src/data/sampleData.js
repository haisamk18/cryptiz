const sampleData = {

    riskScore: 68,
  
    totalAssets: "$12,480",
  
    activeApprovals: 14,
  
    riskyTokens: 3,
  
    suspiciousContracts: [
      {
        name: "UnknownSwap Router",
        level: "High"
      },
      {
        name: "FakeAirdrop Contract",
        level: "Critical"
      }
    ],
  
    suspiciousTokens: [
      {
        token: "FAKEUSDT",
        reason: "Impersonation token"
      },
      {
        token: "FREEETH",
        reason: "Dusting attack"
      },
      {
        token: "AIRDROPX",
        reason: "Possible honeypot"
      }
    ]
  };
  
  export default sampleData;