<template>
  <div>
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </h1>
            <p class="text-xs-center">
              <a href>Have an account?</a>
            </p>

            <ul class="error-messages">
              <li>That email is already taken</li>
            </ul>

            <form @submit.prevent="onSubmit">
              <fieldset v-if="!isLogin" class="form-group">
                <input
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                {{ isLogin ? "Sign in" : "Sign up" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register, login } from "@/api/user.js";
import { mapMutations } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;
// process.env === 'client' ? import Cookie from 'js-cookie' : ''
// import Cookie from "js-cookie";
export default {
  name: "loginIndex",
  middleware: "noauth",
  data() {
    return {
      user: {
        email: "",
        password: "",
        username: "",
      },
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    ...mapMutations(["setUser"]),
    async onSubmit() {
      if (!this.isLogin) {
        const { data } = await register({ user: this.user });
      } else {
        const { data } = await login({ user: this.user });
      }
      this.setUser(data.user);
      Cookie.set("user", data.user);
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
