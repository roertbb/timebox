# timebox

REST service for creating timetables similar to Gantt diagrams

### Service design

| URI                                      | GET                                                     | POST                                                                                         | PUT                                              | PATCH                                                      | DELETE                                                              |
| ---------------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| /timelines                               | list timelines                                          | create new timeline                                                                          | -                                                | -                                                          | -                                                                   |
| /timelines/{tid}                         | get information about timeline with {tid} id            | -                                                                                            | update informations about timeline with {tid} id | partially update informations about timeline with {tid} id | delete timeline with {tid} id and all related events, rows, columns |
| /timelines/{tid}/events                  | list events for timeline with {tid} id                  | create new event for timeline with {tid} id                                                  | -                                                | -                                                          | -                                                                   |
| /timelines/{tid}/events/{eid}            | get information about event with {eid} id               | -                                                                                            | update information about event with {eid} id     | partially update informations about event with {eid} id    | delete event with {eid} id                                          |
| /timelines/{tid}/rows/                   | list rows informations for timeline with {tid} id       | create new row for timeline with {tid} id                                                    | -                                                | -                                                          | -                                                                   |
| /timelines/{tid}/rows/{rid}              | get information about row with {rid} id                 | -                                                                                            | update information about row with {rid} id       | partially update informations about row with {rid} id      | delete row with {rid} id and events, that belong to row             |
| /timelines/{tid}/rows/{rid}/events       | list events for row with {rid} id                       | -                                                                                            | -                                                | -                                                          | -                                                                   |
| /timelines/{tid}/categories/             | list categories informations for timeline with {tid} id | create new category for timeline with {tid} id                                               | -                                                | -                                                          | -                                                                   |
| /timelines/{tid}/categories/{cid}        | get information about category with {cid} id            | -                                                                                            | update information about category with {cid} id  | partially update informations about category with {cid} id | delete category with {cid} id and events, that belong to category   |
| /timelines/{tid}/categories/{cid}/events | list events for categories with {cid} id                | -                                                                                            | -                                                | -                                                          | -                                                                   |
| /category-transfers                      | -                                                       | transfer category and related events to different timeline (assignments to rows are removed) | -                                                | -                                                          | -                                                                   |

### development

database configuration can be found in `ormconfig.json`

```sh
npm run dev:tsc & npm run dev:watch
```

### build

```sh
npm run build
```
