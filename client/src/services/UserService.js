const URL = '/users/';

/**
 * Tries to login the user at the REST service
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
        if (err.response.status == 404) {
            return {
                authenticated: false
            }
        } else {
            return {
                authenticated: false,
                error: `Server has returned ${err.response.status}: ${err.response.statusText}. Context: ${err.response.data.error}`
            }
        }
    }
}