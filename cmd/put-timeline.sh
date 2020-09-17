# PUT /api/timelines/{tid}
# update informations about timeline with {tid} id
curl -v -H 'If-Match: "45-GDIyu3Bp6uckgqbn9BNC2cpBA2I"' \
-H 'Content-Type: application/json' -X PUT -d \
'{
    "name": "UI sprint #2",
    "description": "lorem ipsum",
    "startsAt": "2020-06-01T00:00:00.000Z",
    "endsAt": "2020-06-14T00:00:00.000Z"
}' \
http://localhost:3000/api/timelines/2