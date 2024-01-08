import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const user = req.session.get("user");
  const mail = req.session.get("email")

  if (user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      isLoggedIn: true,
      ...mail,
      ...user,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
