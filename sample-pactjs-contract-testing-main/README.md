### Start Pact Broker Steps

#### Create Volume
docker volume create pgdata
docker volume inspect pgdata

#### Run Database
docker run --name pactbroker-db -e POSTGRES_PASSWORD=ebac -e POSTGRES_USER=ebac -e PGDATA=/var/lib/postgresql/data/pgdata -v pgdata:/var/lib/postgresql/data -d postgres

#### Run Postgres Shell
docker run -it --link pactbroker-db:postgres --rm postgres sh -c 'exec psql -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U ebac'

#### Run Database Commands
CREATE USER pactbrokeruser WITH PASSWORD 'root';
CREATE DATABASE pactbroker WITH OWNER pactbrokeruser;
GRANT ALL PRIVILEGES ON DATABASE pactbroker TO pactbrokeruser;

#### Run Pact Broker
docker run --name pactbroker --link pactbroker-db:postgres -e PACT_BROKER_DATABASE_USERNAME=pactbrokeruser -e PACT_BROKER_DATABASE_PASSWORD=root -e PACT_BROKER_DATABASE_HOST=postgres -e PACT_BROKER_DATABASE_NAME=pactbroker -d  -p 9292:9292 pactfoundation/pact-broker