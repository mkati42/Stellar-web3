// index.js
// Fetches token (asset) info from Stellar Horizon API using stellar-sdk

const StellarSdk = require('@stellar/stellar-sdk');
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

// Example asset: USDC issued by a known issuer
// Replace with your asset code and issuer
const assetCode = 'USDC';
require('dotenv').config();
const issuer = process.env.ISSUER_PUBLIC_KEY;

async function fetchAssetInfo(assetCode, issuer) {
  try {
    // Fetch all accounts holding this asset
    const accounts = await server.assets()
      .forCode(assetCode)
      .forIssuer(issuer)
      .call();
    
    if (accounts.records.length === 0) {
      console.log('Asset not found on the network.');
      return;
    }
    const asset = accounts.records[0];
    console.log('Asset Info:');
    console.log(`Code: ${asset.asset_code}`);
    console.log(`Issuer: ${asset.asset_issuer}`);
    console.log(`Amount: ${asset.amount}`);
    console.log(`Num Accounts: ${asset.num_accounts}`);
    console.log(`Flags:`, asset.flags);
    console.log(`Paging Token: ${asset.paging_token}`);
    // You can print more fields as needed
  } catch (err) {
    console.error('Error fetching asset info:', err);
  }
}

// Example usage:
fetchAssetInfo(assetCode, issuer);
