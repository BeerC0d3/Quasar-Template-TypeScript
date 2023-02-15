<template>
  <q-card
    v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
    class="card-round-10 card-shadow"
  >
    <q-card-section>
      <div class="text-h6 text-center q-mt-md">
        <q-img src="src/assets/beer.png" height="150px" width="150px" />
      </div>
      <q-form class="q-gutter-md" @submit="doLogin">
        <q-input
          v-model="user.username"
          outlined
          label="Email"
          stack-label
          :rules="[ruleLogin.required]"
        />

        <q-input
          v-model="user.password"
          outlined
          label="Password"
          type="password"
          stack-label
          :rules="[ruleLogin.required]"
        />
        <div>
          <q-btn
            class="full-width fredoka"
            color="primary"
            label="Accesar"
            rounded
            type="submit"
          ></q-btn>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCommonStore, useUserStore } from 'src/stores/all';
import ruleLogin from 'src/auth/rules/Login';
import { Login } from 'src/auth/types/userModel';
import { useQuasar } from 'quasar';

const $commonStore = useCommonStore();
const $authStore = useUserStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const user = reactive<Login>({
  username: '',
  password: '',
});

const loading = computed(() => $commonStore.isLoading);

const doLogin = async () => {
  try {
    $commonStore.Add_Request();
    await $authStore.Login(user);
    const to = $route.query.to?.toString();

    $router.push('/main');
  } catch (error) {
    $commonStore.Remove_Request();
    alert(error);
  }
};
</script>
<style lang="scss" scoped>
#loginPage {
  .form-style {
    max-width: 500px;
  }
}
</style>
