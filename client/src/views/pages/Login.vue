<template>
  <my-login-form
    @login="updateLoginUser"
  />
</template>

<script>
import MyLoginForm from '@/components/LoginForm.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MyLoginForm,
  },
  methods: {
    ...mapActions([
      'updateLoginUser',
    ]),
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
    ]),
  },
  watch: {
    isAuthenticated() {
      if (this.isAuthenticated) {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>
