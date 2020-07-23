/**
 * @module infrastructure/inMemoryUserDb
 * @author Daniel Conrado
 */

const {
    getUserByUsername: createGetUserByUsername,
    createUser: createCreateUser
} = require('../domain/user/repository')

/**
 * Creates a concrete implementation of {@link user/repository~getUserByUsername}
 * @param {Object.<string, Object>} inMemDb
 */
const getUserByUsername = inMemDb => createGetUserByUsername(
    username => inMemDb[username]
)

/**
 * Creates a concrete implementation of {@link user/repository~createUser}
 * @param {Object.<string, Object>} inMemDb
 */
const createUser = inMemDb => createCreateUser(
    user => inMemDb[user.username] = user
)

module.exports = {
    getUserByUsername,
    createUser
}