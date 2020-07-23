/**
 * User data
 * @module user
 */

/**
 * Creates a new user immutable object
 * 
 * @param {Object} user - the user data
 * @param {string} user.givenName - the user's givenName
 * @param {string} user.lastName - the user's last name
 * @param {string} user.username - the user's unique username
 * @param {string} user.email - the user's email
 * @param {string} user.password  the user's password
 */
const UserData = ({ givenName, lastName, username, email, password }) =>
    Object.freeze({
        givenName,
        lastName,
        username,
        email,
        password,
    });

module.exports = {
    UserData,
};
