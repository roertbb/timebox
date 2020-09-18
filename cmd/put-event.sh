# PUT /api/timelines/{tid}/events/{eid}
# update information about event with {eid} id
curl -v -H 'If-Match: "45-GDIyu3Bp6uckgqbn9BNC2cpBA2I"' \
-H 'Content-Type: application/json' -X PUT -d \
'{
    "name": "File Search API",
    "description": "lorem ipsum...",
    "startsAt": "2020-06-02T00:00:00.000Z",
    "endsAt": "2020-06-04T00:00:00.000Z",
    "timelineId": 1,
    "categoryId": 1,
    "rowId": 1,
}' \
http://localhost:3000/api/timelines/1/events/1