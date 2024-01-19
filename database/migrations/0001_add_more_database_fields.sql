-- Migration number: 0001 	 2024-01-19T02:28:15.901Z
ALTER TABLE
    databases
ADD
    COLUMN worker_url TEXT;

ALTER TABLE
    databases
ADD
    COLUMN uuid TEXT;