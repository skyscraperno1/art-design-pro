<template>
  <Exception :data="data"></Exception>
</template>

<script setup lang="ts">
  import imgUrl from '@imgs/state/404.png'
  const data = reactive({
    title: '404',
    desc: 'Sorry, this is an invalid page.',
    btnText: 'Go Back',
    imgUrl
  })
</script>
