"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";


export default function TokenCheckPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Backend API entegrasyonu
  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    // Kullanıcıdan gelen stringi ayır (ör: USDC:G...ISSUER...)
    const [assetCode, issuer] = input.split(":");
    if (!assetCode || !issuer) {
      setResult("Lütfen 'ASSETCODE:ISSUER' formatında girin.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/token-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetCode, issuer })
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(data.error || "Bilinmeyen bir hata oluştu.");
      } else {
        setResult(
          `Asset: ${data.asset_code}\nIssuer: ${data.asset_issuer}\nAmount: ${data.amount}\nNum Accounts: ${data.num_accounts}`
        );
      }
    } catch (err) {
      setResult("API bağlantı hatası: " + (err as any).message);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-slate-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Stellar Token Authenticity Checker</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleCheck();
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="tokenInput">Asset Code & Issuer</Label>
                <Textarea
                  id="tokenInput"
                  placeholder="Örnek: USDC:G...ISSUER..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  rows={3}
                  className="resize-none"
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Kontrol Ediliyor..." : "Token Kontrol Et"}
              </Button>
            </form>
            {result && (
              <div className="mt-6 p-4 rounded bg-slate-50 border text-sm text-gray-700">
                {result}
              </div>
            )}
            <Button onClick={() => router.push('/profile')} className="mt-6 w-full" variant="outline">
              Profil Sayfasına Git
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
