#!/bin/sh

BALANCE=$(node index.js)

QUERY="update ethereum set balance = '${BALANCE}';"
echo $QUERY | mysql -u $MYSQL_USER -p$MYSQL_PASSWORD -h $MYSQL_HOST $MYSQL_DATABASE
echo '{"balance": "' $BALANCE '"}'


