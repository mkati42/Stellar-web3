# Stellar Web3 Token Checker

This project is a modern Web3 application that provides token security checks and wallet connection (Freighter) on the Stellar network. It includes both frontend (Next.js/React) and backend (Express.js/Python) components, and can be easily deployed using Docker.

## Installation

### Requirements

* Node.js (v18+ recommended)
* npm or yarn
* Python 3.x
* pip
* make
* Docker (optional, for production environments)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kullanici/stellar-web3.git
   cd stellar-web3
   ```

2. **Set up environment variables:**

   * Copy `.env.example` to `.env` in the root directory:

     ```bash
     cp .env.example .env
     ```
   * Fill in the `WALLET_PUBLIC_KEY` and `ISSUER_PUBLIC_KEY` values in the `.env` file.

3. **Install all dependencies:**

   ```bash
   make setup
   ```

   This command installs both backend (Python) and frontend (Node.js) dependencies and prepares the `.env` file.

4. **Start the development environment:**

   * For the frontend:

     ```bash
     cd frontend
     npm run dev
     ```
   * For the backend:

     ```bash
     cd backend
     python3 index.js
     ```

5. **To run with Docker:**

   ```bash
   sudo docker compose up -d --build
   ```

## Environment Variables (.env)

The `.env` file should be located in the root directory and contain the following variables:

```
WALLET_PUBLIC_KEY=G... (your own public key)
ISSUER_PUBLIC_KEY=GATBZYJ63AEGHFBWXULQNQUF766PV4NJBKKLURZ2KC2KPTCCC5N5AV4Y
```

## Commands

* `make setup` : Installs all dependencies and prepares the .env file
* `make up` : Starts all services with Docker
* `make frontend-up` / `make backend-up` : Starts only the related service
* `make down` : Stops Docker services

## Notes

* You must install the Freighter wallet extension from [https://www.freighter.app/](https://www.freighter.app/).
* Do not share your `.env` file during development.


---

Herhangi bir sorun veya katkı için lütfen issue açın veya PR gönderin.
