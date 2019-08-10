/** creating middleware functions
 * @param request
 * @param response
 * has access to respose and response and can modify them as we want
 */
const logger = (req, res, next) => {
  //write url to console with date (date is imported from moment module explicitly installed)
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next();
};

module.exports=logger;