<template lang="pug">
  div
    nuxt
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  methods: {
    logout() {
      // 外部 API 上の JWT クッキーを無効化させるコードも必要です
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
    }
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;

    * {
      font-family: 'Noto Sans JP', sans-serif;
    }
  }
</style>
