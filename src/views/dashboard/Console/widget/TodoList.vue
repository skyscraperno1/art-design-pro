<template>
  <div class="region todo-list art-custom-card">
    <div class="card-header">
      <div class="title">
        <h4 class="custom-text box-title">Account Balance</h4>
        <p class="custom-text subtitle"></p>
      </div>
    </div>
    <div class="num-card">
      {{ num }} <span>$</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue-demi'

  const num = 131.21;
</script>

<style lang="scss" scoped>
  .todo-list {
    box-sizing: border-box;
    flex: 1;
    padding: 0 25px;
    margin-left: var(--console-margin);

    .card-header {
      .title {
        p {
          span {
            color: red !important;
          }
        }
      }
    }
    .num-card {
      font-size: 32px;
      margin-top: 39px;
      span {
        font-size: 22px;
      }
    }
  }
</style>
