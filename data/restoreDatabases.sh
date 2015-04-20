#!/bin/bash

for db in books-dev books-tst books-acc books-prd
do
    echo "Dropping $db"
    mongo $db --eval "db.dropDatabase()"
    echo "Restoring $db"
    mongorestore -d $db seed
done