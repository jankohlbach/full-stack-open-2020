note over browser:
js will append new note into list
end note

note over browser:
note will be sent to server in json format
with content-type header set to application/json
end note

browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa

note over server:
server is saving note
(temporarily or in database)
end note

server-->browser: 201 statuscode Created

note over browser:
no need for any more requests
end note
