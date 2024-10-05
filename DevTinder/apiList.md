# DevTinder APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileROuter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/:status/:userId - status :- ignored, interested

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/connections
- GET /user/request
- GET /feed - Gets a the profile on your

Status : igonre, interested, accepeted, rejected
