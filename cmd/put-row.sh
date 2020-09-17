# PUT /api/timelines/{tid}/rows/{rid}
# update information about row with {rid} id
curl -v -H 'If-Match: "27-PV6HFKuGPeiOGdnEDNIW6v2weVo"' \
-H 'Content-Type: application/json' -X PUT -d \
'{
    "name": "Robert",
    "timelineId": 2
}' \
http://localhost:3000/api/timelines/1/rows/1