DROP DATABASE IF EXISTS effitask;
DROP ROLE effitask;
DROP ROLE effiTask;
create database effitask;
CREATE USER effitask WITH PASSWORD 'effitask';
GRANT ALL PRIVILEGES ON DATABASE effitask to effitask;
ALTER USER effitask CREATEDB;