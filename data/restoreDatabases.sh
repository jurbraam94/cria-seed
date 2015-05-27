#!/bin/bash

# books-prd keeps its data
for db in groep7-dev groep7-tst groep7-acc
do
    echo "Dropping $db"
    mongo $db --eval "db.dropDatabase()"
    echo "Restoring $db"
    mongorestore -d $db seed
done
