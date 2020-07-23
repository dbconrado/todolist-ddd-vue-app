/**
 * @module user/repository
 * @author Daniel Conrado
 */

const missingImpl = (funcName = "not informed") => async () => {
    throw new Error(`Missing implementation: ${funcName}`);
};

/**
 * Creates a function that gets a user by its username
 * 
 * @param {Function} getUserByUsernameImpl the concrete implementation
 * @returns {function(string): Object} a function that takes a username and
 * returns a user object or null if not found
 */
const getUserByUsername = (
    getUserByUsernameImpl = missingImpl("getUserByUsername")
) => async (username) => {
    return await getUserByUsernameImpl(username);
};

/**
 * Creates a function that creates a user.
 * 
 * @param {Object} impls
 * @param {Function} impls.createUserImpl the concrete implementation of createUser
 * @param {Function} impls.getUserByUsernameImpl the concrete implementation of getUserByUsername
 * @returns {function(Object)} a function that takes user's properties and tries to create it in the repository.
 * @throws UsernameAlreadyTaken 
 */
const createUser = ({
    createUserImpl = missingImpl("createUser"),
    getUserByUsernameImpl = missingImpl("getUserByUsername"),
}) => async ({ givenName, lastName, username, email, password }) => {
    const possibleDuplicateUser = await getUserByUsernameImpl(username);

    if (!possibleDuplicateUser) throw new Error("UsernameAlreadyTaken");

    return await createUserImpl({
        givenName,
        lastName,
        username,
        email,
        password,
    });
};

module.exports = {
    getUserByUsername,
    createUser,
};
