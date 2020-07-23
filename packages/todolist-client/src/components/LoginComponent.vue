<template>
    <form @submit.prevent="login">
        <h2>Todolist app : login</h2>
        <div class="input-field">
            <input type="text" id="username" autofocus required
                enterkeyhint="next" mozactionhint="next" v-model="username"
                :disabled="locked">
            <label for="username">Username</label>
        </div>
        <div class="input-field">
            <input type="password" id="password" required
                enterkeyhint="go" mozactionhint="go" v-model="password"
                :disabled="locked">
            <label for="password">Password</label>
        </div>
        <div class="valign-wrapper">
            <button class="btn waves-effect" type="submit" :disabled="locked">Login</button>
            <div id="preloader" class="preloader-wrapper small" :class="{ active: loading }">
                <div class="spinner-layer">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="error">
            <p class="error">{{ errorMsg }}</p>
        </div>
    </form>
</template>

<script>
/**
I delegate to the component the responsibility of
assembling the authentication logic from authService,
userService and axios.

I must say I'm not satisfied with the result.

@todo needs refactoring :'(
*/
import authService from '../services/AuthService'
import userService from '../services/UserService'
import { triesToLogin as createTriesToLogin } from '../presentation/login-view'
import axios from '../services/axios-config'

export default {
    name: 'Login',
    data () {
        return {
            username: '',
            password: '',
            error: false,
            errorMsg: 'Bad login information',
            locked: false,
            triesToLogin: undefined,
            loading: false
        }
    },
    methods: {
        lockView(status) {
            this.locked = status;
        },
        onError(msg) {
            this.error = true;
            this.errorMsg = msg;
        },
        setProgress(enabled) {
            this.loading = enabled;
        },
        onSuccess() {
            this.$router.replace(this.$route.query.redirect || '/');
        },
        async login () {
            /*authService.login(this.username, this.password, res => {
                if (!res.authenticated) {
                    this.error = true;
                    this.errorMsg = res.error;
                } else {
                    this.$router.replace(this.$route.query.redirect || '/');
                }
            });*/
            await this.triesToLogin({ username: this.username, password: this.password });
        }
    },
    mounted() {
        const doLoginImpl = userService.doLogin({ axios });
        const loginImpl = authService.login({ doLogin: doLoginImpl });

        this.triesToLogin = createTriesToLogin({
            login: loginImpl,
            lockView: this.lockView,
            setProgress: this.setProgress,
            onError: this.onError,
            onSuccess: this.onSuccess
        })
    }
}
</script>

<style scoped>
#preloader {
    margin-left: 1rem;
}

.error {
    color: firebrick
}
</style>