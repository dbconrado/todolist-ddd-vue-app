const URL = '/users/';

/**
 * Tries to login the user with the REST service
 * @param {Object} options
 * @param {Object} options.axios - the axios instance
 * @returns {{
 *  authenticated: boolean,
 *  token: string=,
 *  user: Object=,
 *  error: string=
 * }} an object describing what happened. The token will be present
 * if authenticated is true. The error will be present if an error
 * happened, and authenticated will always be false.
 */
export const doLogin = ({ axios }) => async (username, password) => {
    try {
        const res = await axios.post(`${URL}login`, {
            username,
            password
        });

        // three outcomes
        // 1 - login succeded, heres your token
        // 2 - login failed - username/password incorrect
        // 3 - server error
        return {
            authenticated: true,
            token: res.data.token,
            user: res.data.user
        }
    } catch (err) {
        if (err.response && err.response.status == 404) {
            return {
                authenticated: false,
                error: 'Username/password not valid'
            }
        } else if (err.response) {
            return {
                authenticated: false,
                error: `Server has returned ${err.response.status}: ${err.response.statusText}. Context: ${err.response.data.error}`
            }
        } else {
            return {
                authenticated: false,
                error: 'Can\'t connect to the server. Try again later?'
            }
        }
    }
}

export default {
    doLogin
}