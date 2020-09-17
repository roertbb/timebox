# PUT /api/timelines/{tid}/categories/{cid}
# update information about category with {cid} id
curl -v -H 'If-Match: "27-PV6HFKuGPeiOGdnEDNIW6v2weVo"' \
-H 'Content-Type: application/json' -X PUT -d \
'{
    "name": "Search improvements"
}' \
http://localhost:3000/api/timelines/1/categories/1