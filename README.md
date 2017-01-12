# Example to JWT with express

* To run

  * Install

    ```
    npm install
    ```

  * Execute

    ```
    npm run start
    ```


* Get token (In code the token expire in 60 seconds, change in index.js line 37)

`curl -X POST -H "Content-Type: application/json" -d '{"email":"john@mail.com","password":"john123"}' "http://localhost:3000/token"`

* Check authentication, it a example, is necessary get valid token, it a token example

`curl -X GET -H "Content-Type: application/json" -H "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlhdCI6MTQ4NDI1NTgwNywiZXhwIjoxNDg0MjU1ODY3fQ.D3UNO7eKboB2MljneC9qWEUvIMykX-nVqNMPWEmJ6Z4" -H "Cache-Control: no-cache" "http://localhost:3000/user"`
