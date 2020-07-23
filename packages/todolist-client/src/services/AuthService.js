/**
 * This AuthService is supposed to be 'global'
 * in a way that every page can benefit from
 * its funcionality.
 * 
 * Here I encapsulate the logic to persist
 * a user 'session', and I'm using localStorage for that.
 * 
 * @todo this might be unsafe.
 */
export default {
    /**
     * Tries to login the user
     * @inner
     * @param {string} username 
     * @param {string} password 
     */
    login: ({ doLogin }) => async (username, password) => {

        if (localStorage.token) {
            return { authenticated: true };
        }

        const res = await doLogin(username, password);

        if (res.authenticated) {
            localStorage.token = res.token;
            return { authenticated: true, user: res.user };
        } else {
            return { authenticated: false, error: res.error };
        }
    },

    async logout () {
        delete localStorage.token;
    },

    loggedIn() {
        return !!localStorage.token;
    }
}