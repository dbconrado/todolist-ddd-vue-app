<template>
    <form @submit.prevent="login">
        <h2>Todolist app : login</h2>
        <div class="input-field">
            <input type="text" id="username" autofocus required
                enterkeyhint="next" mozactionhint="next" v-model="username">
            <label for="username">Username</label>
        </div>
        <div class="input-field">
            <input type="password" id="password" required
                enterkeyhint="go" mozactionhint="go" v-model="password">
            <label for="password">Password</label>
        </div>
        <div>
            <button class="btn waves-effect" type="submit">Login</button>
        </div>
        <div v-if="error">
            <p>Bad login information.</p>
        </div>
    </form>
</template>

<script>

import authService from '../services/AuthService'

export default {
    name: 'Login',
    data () {
        return {
            username: '',
            password: '',
            error: false
        }
    },
    methods: {
        login () {
            authService.login(this.username, this.password, loggedIn => {
                if (!loggedIn) {
                    this.error = true;
                } else {
                    this.$router.replace(this.$route.query.redirect || '/');
                }
            })
        }
    }
}
</script>