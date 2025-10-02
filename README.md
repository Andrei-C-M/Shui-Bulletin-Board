Shui Bulletin Board - Individual Exam

service: Shui-bulletin-board-backend
stage: dev
region: eu-north-1
stack: Shui-bulletin-board-backend-dev
endpoints:
  POST - https://lcs5hw1hnj.execute-api.eu-north-1.amazonaws.com/messages
  GET - https://lcs5hw1hnj.execute-api.eu-north-1.amazonaws.com/messages
  GET - https://lcs5hw1hnj.execute-api.eu-north-1.amazonaws.com/messages/{username}
  PUT - https://lcs5hw1hnj.execute-api.eu-north-1.amazonaws.com/messages/{id}
functions:
  createMessage: Shui-bulletin-board-backend-dev-createMessage
  listMessages: Shui-bulletin-board-backend-dev-listMessages
  listMessagesByUser: Shui-bulletin-board-backend-dev-listMessagesByUser
  updateMessage: Shui-bulletin-board-backend-dev-updateMessage


  link -- http://shui-bulletin-andre-2025.s3-website.eu-north-1.amazonaws.com/#/
