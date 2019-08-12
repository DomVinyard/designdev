exports.handler = function(event, context, callback) {
  console.log({ event, context: context.clientContext.custom })
  callback(null, {
    headers: {
      "Content-Type": "text/plain",
      "X-Content-Type-Options": "nosniff",
    },
    statusCode: 200,
    body: "Hello, World",
  })
}
