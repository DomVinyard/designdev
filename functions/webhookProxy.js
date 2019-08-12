exports.handler = function(event, context, callback) {
  const challenge = event.queryStringParameters.challenge
  console.log({ challenge })
  callback(null, {
    headers: {
      "Content-Type": "text/plain",
      "X-Content-Type-Options": "nosniff",
    },
    statusCode: 200,
    body: challenge,
  })
}
