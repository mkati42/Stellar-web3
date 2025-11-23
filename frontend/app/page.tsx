"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/lib/wallet-context";

export default function Home() {
  const router = useRouter();
  const { walletAddress, isConnected, isLoading, connectWallet } = useWallet();

  useEffect(() => {
    if (isConnected && walletAddress) {
      router.replace("/token-check");
    }
  }, [isConnected, walletAddress, router]);

  if (isConnected && walletAddress) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-slate-200 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Stellar Token Authenticity Checker</h1>
      <Button onClick={connectWallet} className="px-8 py-4 text-lg font-semibold" disabled={isLoading}>
        {isLoading ? "Bağlanıyor..." : "Connect Wallet (Freighter)"}
      </Button>
    </main>
  );
}
