<template>
    <nav class="cyan darken-3">
        <div class="container">
            <div class="nav-wrapper">
                <a
                    href="#"
                    data-target="main-menu"
                    class="button-collapse show-on-large sidenav-trigger"
                >
                    <i class="fa fa-bars"></i>
                </a>
                <router-link to="/" class="brand-logo center sidenav-close">Todolist</router-link>
                <ul id="main-menu" class="sidenav">
                    <li>
                        <router-link to="/" class="sidenav-close">
                            <i class="fa fa-tasks"></i>Tasks
                        </router-link>
                    </li>
                    <li class="divider"></li>
                    <li>
                        <router-link to="/logout" class="sidenav-close">
                            <i class="fas fa-sign-out-alt"></i>Logout
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import M from 'materialize-css'

export default {
    name: 'TopBar',
    mounted () {
        M.Sidenav.init(document.querySelector('.sidenav'));
    }
}
</script>