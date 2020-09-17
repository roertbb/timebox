# PATCH /api/timelines/{tid}/categories/{cid}
# partially update informations about category with {cid} id
curl -v -H 'If-Match: "18-Hi3UrsKcgU1kFcX2mzSXb7mlEKM"' \
-H 'Content-Type: application/json' -X PATCH -d \
'{
    "name": "Search feature",
    "description: "lorem ipsum...",
    "color: "#d9ead3"
}' \
http://localhost:3000/api/timelines/1/categories/1