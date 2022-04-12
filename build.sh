#!/bin/bash
green=`tput setaf 2`
reset=`tput sgr0`

echo -e "\n${green}[========================= Building Docker Image =========================]${reset}"
docker-compose build
docker-compose up -d

echo -e "${green}[========================= Executing  Migrations =========================]${reset}"
chars="."
end=$((SECONDS+60))

while [ $SECONDS -lt $end ]; do
    sleep 0.5
    echo -en "${chars:$i:1}"
done

docker exec customer-service npx prisma migrate deploy
docker exec rental-service npx prisma migrate deploy
docker exec admin-service npx prisma migrate deploy

docker exec customer-service npx prisma generate
docker exec rental-service npx prisma generate
docker exec admin-service npx prisma generate