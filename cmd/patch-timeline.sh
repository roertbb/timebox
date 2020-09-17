# PATCH /api/timelines/{tid}
# partially update informations about timeline with {tid} id

curl -v -H 'If-Match: "84-qBYRdvipq4ZJbXaWBc6cxAHe5Zc"' \
-H 'Content-Type: application/json' -X PATCH -d \
'{
    "name": "UI sprint #3"
}' \
http://localhost:3000/api/timelines/1