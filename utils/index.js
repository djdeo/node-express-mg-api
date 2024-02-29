exports.wrapResponse = (code, data, message) => {
  return { code, data, message}
}

exports.catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

exports.renderErrMsg = (res, err) => {
  return res.status(500).json({
    message: err.message,
  });
}