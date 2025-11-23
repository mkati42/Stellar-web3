const express = require("express");
const cors = require("cors");
const StellarSdk = require("@stellar/stellar-sdk");

const app = express();
const port = 4000;
const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

app.use(cors());
app.use(express.json());

app.post("/api/token-info", async (req, res) => {
  const { assetCode, issuer } = req.body;
  if (!assetCode || !issuer) {
    return res.status(400).json({ error: "assetCode and issuer are required" });
  }
  try {
    const assets = await server.assets().forCode(assetCode).forIssuer(issuer).call();
    if (!assets.records.length) {
      return res.status(404).json({ error: "Asset not found on the network" });
    }
    const asset = assets.records[0];
    res.json({
      asset_code: asset.asset_code,
      asset_issuer: asset.asset_issuer,
      amount: asset.amount,
      num_accounts: asset.num_accounts,
      flags: asset.flags,
      paging_token: asset.paging_token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Unknown error" });
  }
});

app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`);
});
