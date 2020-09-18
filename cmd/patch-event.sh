# PUT /api/timelines/{tid}/events/{eid}
# partially update informations about event with {eid} id
curl -v -H 'If-Match: "73-DYiA2RPnRSwEXB98c1SqFjW4LpQ"' \
-H 'Content-Type: application/json' -X PUT -d \
'{
    "categoryId": 4
}' \
http://localhost:3000/api/timelines/1/events/1