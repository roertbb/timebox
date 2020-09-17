# PATCH /api/timelines/{tid}/rows/{rid}
# partially update informations about row with {rid} id
curl -v -H 'If-Match: "18-Hi3UrsKcgU1kFcX2mzSXb7mlEKM"' \
-H 'Content-Type: application/json' -X PATCH -d \
'{
    "name": "Trebor"
}' \
http://localhost:3000/api/timelines/1/rows/4