# STAC – Stellar Token Authenticity Checker

## 1. Project Scope

**Amaç:**
Stellar ağındaki token’ların güvenilirliğini analiz ederek kullanıcıların sahte veya riskli token’lardan korunmasını sağlamak.

**Proje Kapsamı:**

* Token'ların doğrulanmış domain bilgilerini kontrol etmek
* Issuer adresi güvenilirliğini incelemek
* Horizon API üzerinden token metadata çekmek
* Token davranış analizi (hesap sayısı, işlem geçmişi, yaş bilgisi)
* Risk skoru üretmek (0–100)
* Kullanıcıya açık, anlaşılır bir güvenlik raporu sunmak

---

## 2. Project Steps

### **Adım 1 — Tanımlama ve Analiz**

* Stellar ağındaki sahte token problemini inceleme
* Mevcut Verified Assets ve Horizon API yeteneklerini analiz etme
* Kullanıcı ihtiyaçlarını belirleme: cüzdan kullanıcıları, geliştiriciler, işletmeler

### **Adım 2 — Tasarım**

* Veri akış diyagramı oluşturma
* Token doğrulama kriterlerini belirleme
* Risk hesaplama algoritmasının tasarlanması
* UI/CLI mimarisinin planlanması

### **Adım 3 — API Entegrasyonu**

* Horizon üzerinden token bilgisi çekme
* Issuer domain kontrolü (stellar.toml)
* Token davranış verilerinin işlenmesi

### **Adım 4 — Risk Skorlama Motoru**

* Domain doğrulama puanı
* Hesap sayısı ve işlem hacmi puanı
* Token yaş puanı
* Taklit isim ve güvenlik düşürücü faktörler
* Sonuç: 0–100 arası Trust Score

### **Adım 5 — Frontend/CLI Geliştirme**

* Arayüzde arama alanı (Asset Code + Issuer)
* Token bilgisi gösterimi
* Risk skoru gösterimi
* Uyarı mesajları (High/Medium/Low Risk)

### **Adım 6 — Test ve Doğrulama**

* Gerçek token testleri (USDC, EURC vb.)
* Sahte token testleri
* Eksik domain testleri
* Çok düşük hesaplı token testleri

### **Adım 7 — Dağıtım**

* Frontend’in build edilmesi
* Vercel / Netlify / GitHub Pages’e deploy
* Testnet üzerinde kontrol

### **Adım 8 — Demo Hazırlığı**

* Ekran görüntüleri
* Video demo
* Sunum dosyası (pitch deck)

---

## 3. Expected Outcomes

### **MVP Sonuçları:**

* Kullanıcı-token girişi yapılabilen çalışan ara yüz
* Horizon API’den çekilen gerçek zamanlı token verisi
* Otomatik risk analizi ve Trust Score üretimi
* Doğrulanmamış token’lar için uyarı sistemi
* Temel UI ile sonuçların sunulması

### **Tamamlanan Çıktılar:**

* `risk_score_engine.js` veya `risk_engine.py` dosyası
* Web arayüzü (HTML/JS/TS veya Astro)
* API bağlantı modülü
* Test raporları
* Demo materyalleri

---

## 4. Success Criteria

* Sahte token’ların en az %90 oranında doğru tespit edilmesi
* Doğrulanmış token’ların düşük risk ile işaretlenmesi
* Kullanıcıya anında, net bilgi sunulması
* Jüri ve kullanıcılar tarafından anlaşılır bir demo elde edilmesi

---

## 5. Future Enhancements

* Soroban akıllı kontrat ile on-chain doğrulama
* Topluluk oylamalı (DAO tabanlı) risk değerlendirme
* Gelişmiş davranış analizi (pyrograph, graph-activity)
* Token karşılaştırma modu (Compare View)
* Cüzdan entegrasyonu (Freighter, Albedo)

---

## 6. Credits

* Stellar Geliştirici Topluluğu
* Horizon API ve Soroban ekosistemi
* Proje sahibi: <YOUR NAME>

---

## 7. Resources & References

- [Stellar Developer Docs](https://developers.stellar.org/docs)
- [Soroban Docs](https://soroban.stellar.org/docs)
- [Stellar Lab](https://laboratory.stellar.org/)
- [Stellar Expert](https://stellar.expert/)
- [Passkey-Kit](https://github.com/stellar/passkey-kit)
- [Example Contracts](https://soroban.stellar.org/docs/examples)
- [Frontend Templates](https://github.com/stellar/scaffold-stellar-astro)
- [Stellar SDKs](https://developers.stellar.org/docs/software-and-sdks/)

---

> **Not:** Proje boyunca bu dosyayı güncel tut!