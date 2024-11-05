function sendErrorResponse(res, error) {
  const statusCode = error?.status || 500; // Use the error's status code or default to 500
  const message = error?.message || "Internal Server Error"; // Use the error's message or a default

  console.log(error?.message, "senderroresponse");

  return res.status(statusCode).json({ message });
}

function sendSuccessResponse({ res, data, message, statusCode }) {
  return res.status(statusCode || 200).json({
    message: message || "Success",
    data: data || {},
  });
}

module.exports = { sendErrorResponse, sendSuccessResponse };
