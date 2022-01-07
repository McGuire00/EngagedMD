const isUsernameValid = (username) => {
  /*
    Username can only have:
      - alphanumeric characters
      - letters and numbers

    In scale this would be opened to allow a wider range of usernames
  */
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(username);
};

module.exports = isUsernameValid

