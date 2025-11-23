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
    // XLM için sadece assetCode ile, diğerleri için eski kontrol
    const trimmed = input.trim();
    if (trimmed.toUpperCase() === "XLM") {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/token-info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assetCode: "XLM" })
        });
        const data = await res.json();
        if (!res.ok) {
          setResult(data.error || "Bilinmeyen bir hata oluştu.");
        } else {
          setResult(
            `Asset: ${data.asset_code}\nAmount: ${data.amount}`
          );
        }
      } catch (err) {
        setResult("API bağlantı hatası: " + (err as any).message);
      }
      setLoading(false);
      return;
    }
    // Diğer varlıklar için eski kontrol
    const [assetCode, issuer] = trimmed.split(":");
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
          `Asset: ${data.asset_code}\nIssuer: ${data.asset_issuer}\nAmount: ${data.amount}`
        );
      }
    } catch (err) {
      setResult("API bağlantı hatası: " + (err as any).message);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-2xl bg-gradient-to-br from-[#0a1833] via-[#232b36] to-[#181a1f] border border-gray-800 p-2 md:p-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-gray-300 to-gray-600">Choken Token Checker</CardTitle>
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
                <Label htmlFor="tokenInput" className="text-gray-200">Asset Code & Issuer</Label>
                <Textarea
                  id="tokenInput"
                  placeholder="Örnek: USDC:G...ISSUER..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  rows={3}
                  className="resize-none bg-gray-900 text-gray-100 border-gray-700 placeholder:text-gray-500"
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-900 via-gray-800 to-black text-white border-none shadow hover:from-blue-800 hover:to-gray-900">
                {loading ? "Kontrol Ediliyor..." : "Token Kontrol Et"}
              </Button>
            </form>
            {result && (
              <div className="mt-6 p-4 rounded bg-gray-900 border border-gray-700 text-sm text-gray-200">
                {result}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
