import { triesToLogin } from '../presentation/login-view'
import axios from './axios-config'
import { doLogin as createDoLogin } from './UserService'

const doLogin = createDoLogin({axios});
console.log(doLogin);

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
            if (callback) callback({ authenticated: true })
        }

        this.invokeAuthApi(username, password, (res) => {
            console.log(res);
            if (res.authenticated) {
                localStorage.token = res.token;
                if (callback) callback({ authenticated: true });
            } else {
                if (callback) callback({ authenticated: false, error: res.error });
            }
        })
    },

    async logout () {
        delete localStorage.token;
    },

    loggedIn() {
        return !!localStorage.token;
    },

    invokeAuthApi (username, password, callback) {
        triesToLogin({
            doLogin,
            lockView: () => {},
            setProgress: () => {},
            onError: (err) => {
                callback({ authenticated: false, error: err })
            },
            next: callback
        })({ username, password });

        /*if ((username == 'daniel') && (password == '123')) {
            callback({
                authenticated: true,
                token: Math.random().toString(36).substring(7)
            });
        } else {
            callback({ authenticated: false })
        }*/
    }
}