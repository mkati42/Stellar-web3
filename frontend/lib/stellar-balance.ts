import { Server, Asset } from '@stellar/stellar-sdk';

export interface AssetBalance {
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  balance: string;
}

export async function fetchStellarBalances(address: string, network: 'testnet' | 'mainnet' | 'public' = 'testnet'): Promise<AssetBalance[]> {
  const server = new Server(
    network === 'testnet'
      ? 'https://horizon-testnet.stellar.org'
      : 'https://horizon.stellar.org'
  );
  try {
    const account = await server.loadAccount(address);
    return account.balances.map((bal) => ({
      asset_type: bal.asset_type,
      asset_code: bal.asset_code,
      asset_issuer: bal.asset_issuer,
      balance: bal.balance,
    }));
  } catch (e) {
    console.error('Stellar balance fetch error:', e);
    return [];
  }
}
