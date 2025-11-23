"use client";
import { useWallet } from "@/lib/wallet-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function ProfilePage() {
  const { walletAddress, disconnectWallet } = useWallet();
  const router = useRouter();
  useEffect(() => {
    if (!walletAddress) {
      router.replace("/");
    }
  }, [walletAddress, router]);
  if (!walletAddress) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-slate-200 p-4">
      <div className="p-6 bg-white rounded shadow text-gray-800 text-center max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Profil</h2>
        <div className="mb-2 font-semibold">Stellar Adresiniz:</div>
        <div className="font-mono break-all text-blue-700 mb-6">{walletAddress}</div>
        <Button onClick={disconnectWallet} className="bg-red-500 hover:bg-red-600 text-white w-full">Çıkış Yap</Button>
      </div>
    </main>
  );
}
