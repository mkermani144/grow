docker run --name pg-1 -e POSTGRES_PASSWORD=1234 -d postgres
docker cp ./hello-world.sql pg-1:/hello-world.sql
sleep 5
docker exec -it pg-1 psql -U postgres -f ./hello-world.sql
