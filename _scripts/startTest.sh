docker compose -f docker-compose.test.yaml up -d
docker exec -it test_api bash -c "npm install && npm test" 