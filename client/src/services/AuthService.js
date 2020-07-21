export default {
    /**
     * Tries to login the user
     * 
     * @param {string} username 
     * @param {string} password 
     * @param {Function(Boolean)} callback - the callback that will be called
     * indicating true if login was successful or an user is already logged
     * or false if login failed.
     */
    login (username, password, callback) {

        if (localStorage.token) {
            if (callback) callback(true);
            return;
        }

        this.invokeAuthApi(username, password, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (callback) callback(true);
            } else {
                if (callback) callback(false);
            }
        })
    },

    logout (callback) {
        delete localStorage.token;
        if (callback) callback();
    },

    loggedIn() {
        return !!localStorage.token;
    },

    invokeAuthApi (username, password, callback) {
        setTimeout(() => {
            if ((username == 'daniel') && (password == '123')) {
                callback({
                    authenticated: true,
                    token: Math.random().toString(36).substring(7)
                });
            } else {
                callback({ authenticated: false })
            }
        }, 0)
    }
}