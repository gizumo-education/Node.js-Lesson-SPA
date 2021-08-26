<template>
  <div>
    <div v-for="user in userList"
      :key="user.id">
      <p>ユーザーのid：{{ user.id }}</p>
      <p>ユーザーの名前：{{ user.username }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  created() {
    this.getUserList();
  },
  methods: {
    ...mapActions({
      getUserList: 'updateUserList',
    }),
  },
  computed: {
    ...mapGetters([
      'userList',
    ]),
  },
};
</script>