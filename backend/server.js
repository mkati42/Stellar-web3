const express = require("express");
const cors = require("cors");
const StellarSdk = require("@stellar/stellar-sdk");

const app = express();
const port = 4000;
const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

app.use(cors());
app.use(express.json());


app.post("/api/token-info", async (req, res) => {
  const { assetCode, issuer, network } = req.body;
  if (!assetCode) {
    return res.status(400).json({ error: "assetCode is required" });
  }
  // Ağ seçimi
  const horizonUrl = network === "mainnet"
    ? "https://horizon.stellar.org"
    : "https://horizon-testnet.stellar.org";
  const dynamicServer = new StellarSdk.Horizon.Server(horizonUrl);

  // XLM için özel kontrol
  if (assetCode === "XLM") {
    try {
      const ledger = await dynamicServer.ledgers().order("desc").limit(1).call();
      const latest = ledger.records[0];
      res.json({
        asset_code: "XLM",
        asset_issuer: null,
        amount: latest.total_coins,
        flags: null,
        paging_token: null,
      });
    } catch (err) {
      res.status(500).json({ error: err.message || "Unknown error" });
    }
    return;
  }
  // Diğer varlıklar için mevcut kontrol
  if (!issuer) {
    return res.status(400).json({ error: "issuer is required for non-XLM assets" });
  }
  try {
    const assets = await dynamicServer.assets().forCode(assetCode).forIssuer(issuer).call();
    if (!assets.records.length) {
      return res.status(404).json({ error: "Asset not found on the network" });
    }
    const asset = assets.records[0];
    res.json({
      asset_code: asset.asset_code,
      asset_issuer: asset.asset_issuer,
      amount: asset.amount,
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
