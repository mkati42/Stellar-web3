"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { isConnected, getPublicKey, getUserInfo } from '@stellar/freighter-api';

const ENV_WALLET_KEY = process.env.NEXT_PUBLIC_WALLET_PUBLIC_KEY;

interface WalletContextType {
  walletAddress: string | null;
  isConnected: boolean;
  isLoading: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('stellaraid_wallet_address') || ENV_WALLET_KEY || null;
    }
    return ENV_WALLET_KEY || null;
  });
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('stellaraid_wallet_connected') === 'true' : false;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const autoReconnect = async () => {
      if (typeof window === 'undefined') return;
      const savedAddress = localStorage.getItem('stellaraid_wallet_address') || ENV_WALLET_KEY;
      const wasConnected = localStorage.getItem('stellaraid_wallet_connected') === 'true';
      if (wasConnected && savedAddress) {
        try {
          const connected = await isConnected();
          if (connected) {
            const publicKey = await getPublicKey();
            if (publicKey === savedAddress) {
              setWalletAddress(savedAddress);
              setIsWalletConnected(true);
            } else {
              localStorage.removeItem('stellaraid_wallet_address');
              localStorage.removeItem('stellaraid_wallet_connected');
            }
          }
        } catch (error) {
          console.error('Auto-reconnect failed:', error);
        }
      }
    };
    autoReconnect();
  }, []);

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      const connected = await isConnected();
      if (!connected) {
        alert('Lütfen Freighter wallet extension yükleyin: https://www.freighter.app/');
        window.open('https://www.freighter.app/', '_blank');
        return;
      }
      const publicKey = await getPublicKey();
      if (publicKey) {
        setWalletAddress(publicKey);
        setIsWalletConnected(true);
        localStorage.setItem('stellaraid_wallet_address', publicKey);
        localStorage.setItem('stellaraid_wallet_connected', 'true');
        console.log('Wallet connected:', publicKey);
      } else if (ENV_WALLET_KEY) {
        setWalletAddress(ENV_WALLET_KEY);
        setIsWalletConnected(true);
        localStorage.setItem('stellaraid_wallet_address', ENV_WALLET_KEY);
        localStorage.setItem('stellaraid_wallet_connected', 'true');
        console.log('Wallet connected from env:', ENV_WALLET_KEY);
      }
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      alert('Cüzdan bağlantısı başarısız oldu: ' + (error.message || 'Bilinmeyen hata'));
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsWalletConnected(false);
    localStorage.removeItem('stellaraid_wallet_address');
    localStorage.removeItem('stellaraid_wallet_connected');
  };

  const value: WalletContextType = {
    walletAddress,
    isConnected: isWalletConnected,
    isLoading,
    connectWallet,
    disconnectWallet,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
