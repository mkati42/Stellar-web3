# Stellar Web3 Token Checker

Bu proje, Stellar ağı üzerinde token güvenliği kontrolü ve cüzdan bağlantısı (Freighter) sağlayan modern bir Web3 uygulamasıdır. Hem frontend (Next.js/React) hem backend (Express.js/Python) bileşenleri içerir ve Docker ile kolayca ayağa kaldırılabilir.

## Kurulum

### Gereksinimler
- Node.js (v18+ önerilir)
- npm veya yarn
- Python 3.x
- pip
- make
- Docker (opsiyonel, prod ortamı için)

### Adımlar

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/kullanici/stellar-web3.git
   cd stellar-web3
   ```

2. **Ortam değişkenlerini ayarlayın:**
   - Kök dizinde `.env.example` dosyasını `.env` olarak kopyalayın:
     ```bash
     cp .env.example .env
     ```
   - `.env` dosyasındaki `WALLET_PUBLIC_KEY` ve `ISSUER_PUBLIC_KEY` değerlerini doldurun.

3. **Tüm bağımlılıkları yükleyin:**
   ```bash
   make setup
   ```
   Bu komut hem backend (Python), hem frontend (Node.js) bağımlılıklarını yükler ve .env dosyasını hazırlar.

4. **Geliştirme ortamını başlatın:**
   - Frontend için:
     ```bash
     cd frontend
     npm run dev
     ```
   - Backend için:
     ```bash
     cd backend
     python3 index.js
     ```

5. **Docker ile başlatmak için:**
   ```bash
   sudo docker compose up -d --build
   ```

## Ortam Değişkenleri (.env)

`.env` dosyası kök dizinde bulunmalı ve aşağıdaki değişkenleri içermelidir:

```
WALLET_PUBLIC_KEY=G... (kendi public key'iniz)
ISSUER_PUBLIC_KEY=GATBZYJ63AEGHFBWXULQNQUF766PV4NJBKKLURZ2KC2KPTCCC5N5AV4Y
```

## Komutlar
- `make setup` : Tüm bağımlılıkları yükler ve .env dosyasını hazırlar.
- `make up` : Docker ile tüm servisi başlatır.
- `make frontend-up` / `make backend-up` : Sadece ilgili servisi başlatır.
- `make down` : Docker servislerini durdurur.

## Notlar
- Freighter cüzdanı için [https://www.freighter.app/](https://www.freighter.app/) uzantısını kurmalısınız.
- Geliştirme sırasında .env dosyanızı kimseyle paylaşmayın.

---

Herhangi bir sorun veya katkı için lütfen issue açın veya PR gönderin.
