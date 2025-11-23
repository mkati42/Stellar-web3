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
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="p-6 rounded-xl shadow-xl text-center max-w-lg w-full bg-gradient-to-br from-[#0a1833] via-[#232b36] to-[#181a1f] border border-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-gray-300 to-gray-600">Profil</h2>
        <div className="mb-2 font-semibold text-gray-200">Stellar Adresiniz:</div>
        <div className="font-mono break-all text-blue-300 mb-6">{walletAddress}</div>
        <Button onClick={disconnectWallet} className="bg-gradient-to-r from-blue-900 via-gray-800 to-black text-white w-full border-none shadow hover:from-blue-800 hover:to-gray-900">Çıkış Yap</Button>
      </div>
    </main>
  );
}
