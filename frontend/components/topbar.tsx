"use client";
import { useRouter, usePathname } from "next/navigation";
import { useWallet } from "@/lib/wallet-context";
import { Button } from "@/components/ui/button";
import { UserIcon, LogOutIcon, ShieldCheck } from "lucide-react";

export default function Topbar() {
  const { walletAddress, isConnected, disconnectWallet } = useWallet();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="w-full flex items-center justify-end px-6 py-3 bg-white shadow-sm gap-2 min-h-[48px]">
      {isConnected && walletAddress && <>
        <button
          className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 transition"
          onClick={() => router.push("/token-check")}
          aria-label="Token Kontrol"
        >
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <span className="hidden sm:inline font-medium text-green-700">Token Kontrol</span>
        </button>
        <button
          className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 transition"
          onClick={() => router.push("/profile")}
          aria-label="Profil"
        >
          <UserIcon className="w-5 h-5 text-blue-700" />
          <span className="hidden sm:inline font-medium text-blue-700">Profil</span>
        </button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => { disconnectWallet(); router.replace("/"); }}
          aria-label="Çıkış Yap"
          className="text-red-500 hover:bg-red-100"
        >
          <LogOutIcon className="w-5 h-5" />
        </Button>
      </>}
    </header>
  );
}
