"use client";
import { useRouter, usePathname } from "next/navigation";
import { useWallet } from "@/lib/wallet-context";
import { Button } from "@/components/ui/button";
import { UserIcon, LogOutIcon, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { walletAddress, isConnected, disconnectWallet } = useWallet();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full flex items-center justify-end px-6 py-3 bg-gradient-to-br from-[#0a1833] via-[#232b36] to-[#181a1f] shadow gap-2 min-h-[48px] border-b border-gray-800">
      {mounted && isConnected && walletAddress ? (
        <>
          <button
            className="flex items-center gap-2 px-3 py-1 rounded bg-gray-900/60 hover:bg-gray-800/80 transition text-gray-100 border border-gray-700"
            onClick={() => router.push("/token-check")}
            aria-label="Token Kontrol"
          >
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="hidden sm:inline font-medium text-blue-300">Token Kontrol</span>
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1 rounded bg-gray-900/60 hover:bg-gray-800/80 transition text-gray-100 border border-gray-700"
            onClick={() => router.push("/profile")}
            aria-label="Profil"
          >
            <UserIcon className="w-5 h-5 text-blue-400" />
            <span className="hidden sm:inline font-medium text-blue-300">Profil</span>
          </button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { disconnectWallet(); router.replace("/"); }}
            aria-label="Çıkış Yap"
            className="text-red-400 hover:bg-gray-800/80 border border-gray-700"
          >
            <LogOutIcon className="w-5 h-5" />
          </Button>
        </>
      ) : (
        <div className="h-8" />
      )}
    </header>
  );
}
