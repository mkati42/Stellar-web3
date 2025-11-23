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
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-gray-300 to-gray-600">Choken</h1>
      <Button onClick={connectWallet} className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-900 via-gray-800 to-black text-white border-none shadow-lg hover:from-blue-800 hover:to-gray-900" disabled={isLoading}>
        {isLoading ? "Bağlanıyor..." : "Connect Wallet (Freighter)"}
      </Button>
    </main>
  );
}
