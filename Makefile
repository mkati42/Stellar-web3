PYTHON=python3
PIP=pip3
FRONTEND=frontend
BACKEND=backend

setup:
	$(PIP) install -r requirements.txt
	cd $(FRONTEND) && npm install
	@if [ ! -f .env ]; then cp .env.example .env; fi
	@echo "Setup complete."
frontend-restart:
	sudo docker compose stop frontend && sudo docker compose up -d --build frontend

backend-restart:
	sudo docker compose stop backend && sudo docker compose up -d --build backend
frontend-up:
	sudo docker compose up -d --build frontend

frontend-logs:
	sudo docker compose logs -f frontend

frontend-down:
	sudo docker compose stop frontend

backend-up:
	sudo docker compose up -d --build backend

backend-logs:
	sudo docker compose logs -f backend

backend-down:
	sudo docker compose stop backend
up:
	sudo docker compose up -d --build

down:
	sudo docker compose down

logs:
	sudo docker compose logs -f

restart:
	sudo docker compose down && sudo docker compose up -d --build

prune:
	sudo docker compose down -v && sudo docker system prune -af && sudo docker volume prune -f

ps:
	sudo docker compose ps
ps-all:
	sudo docker ps -a