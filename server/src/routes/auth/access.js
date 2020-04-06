const refresh = require('passport-oauth2-refresh');
const User = require('../../db/models/userModel');

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
  return null;
}

const getAccess = (callback, req, res) => {
  let retries = 3;

  const send401Response = () => {
    return res.status(401).end();
  };

  User.findById(req.user, (err, user) => {
    if (err || !user) {
      return send401Response();
    }

    const makeRequest = async () => {
      retries -= 1;
      if (!retries) {
        // Couldn't refresh the access token. Tried twice.
        return send401Response();
      }

      // Set the credentials and make the request.
      try {
        await callback();
      } catch (error) {
        if (error.statusCode === 401) {
          // Access token expired.
          // Try to fetch a new one.
          refresh.requestNewAccessToken('spotify', user.refreshToken, (tokenError, accessToken) => {
            if (tokenError || !accessToken) {
              return send401Response();
            }

            // Save the new accessToken for future use
            // eslint-disable-next-line no-param-reassign
            user.accessToken = accessToken;

            user.save(() => {
              makeRequest();
              // Retry the request.
            });

            User.updateOne(
              { _id: req.user.id },
              {
                accessToken,
              },
            );
            return null;
          });
        } else {
          // There was another error, handle it appropriately.
          return send401Response();
        }
      }
      return null;
    };
    // Make the initial request.
    makeRequest();
    return null;
  });
};

exports.ensureAuthenticated = ensureAuthenticated;
exports.getAccess = getAccess;
