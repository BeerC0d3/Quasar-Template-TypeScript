<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Sucursal </q-toolbar-title>

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <!-- <div><q-btn flat label="Salir" @click="Salir" /></div> -->
          <q-btn v-if="$q.screen.gt.xs" dense flat round icon="apps">
            <q-tooltip>Cambiar sucursal</q-tooltip>
          </q-btn>

          <q-btn dense flat no-wrap>
            <q-avatar size="40px">
              <img src="https://cdn.quasar.dev/img/avatar3.jpg" />
            </q-avatar>
            <q-icon name="arrow_drop_down" size="16px" />

            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div>Signed in as <strong>Mary</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator />

                <q-separator />

                <q-item clickable class="GL__menu-link">
                  <q-item-section @click="Salir">Salir</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list>
          <!-- <MenuRecursive :MenuJson="MenuArray" /> -->

          <MenuRecursive v-for="item in menus" :key="item.id" v-bind="item" />
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Diego luna</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <main class="q-page q-pa-md">
        <router-view />
      </main>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { defineComponent, ref, onBeforeMount, reactive, computed } from 'vue';
import MenuRecursive from '../components/Sistema/MenuRecursive.vue';
import { useUserStore, useCommonStore } from 'stores/all';
import { useRoute, useRouter } from 'vue-router';
import useHookMenu from '../hooks/sistema/hookMenu';

const $store = useUserStore();
const $commonStore = useCommonStore();
const $router = useRouter();
const isAuthenticated = $store.isAuthenticated;

const { getAll, menus } = useHookMenu();

onBeforeMount(async () => {
  try {
    $commonStore.Add_Request();
    await getAll();
  } catch (e) {
    $commonStore.Remove_Request();
    console.log(e);
  }
});
// const getProcess = async () => {
//   try {
//     $commonStore.Add_Request();
//     const clsMenu = new Menu();
//     result.value = await clsMenu.Get();

//     console.log(result.value);
//   } catch (error) {
//     $commonStore.Remove_Request();
//     //alert(error);
//   }
// };

// onMounted(async () => {
//   getProcess();
// });

const Salir = () => {
  $store.logout();
  $router.push('/login');
};

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
