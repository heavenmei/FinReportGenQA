<template>
  <div style="width: 200px" class="nav_left flex flex-col">
    <div class="logo flex items-center gap-2" style="height: 40px">
      <NuxtLink to="/" title="Postman" class="brand">
        <img :src="logo" alt="logo" />
      </NuxtLink>
      <div class="text-xl font-bold">AI Fin</div>
    </div>
    <div class="p-3 flex gap-2">
      <div class="addIcon">+ New Company</div>
      <div class="searchIcon"><icon-search /></div>
    </div>

    <a-menu
      class="w-full flex-1 comp-menu"
      style="scrollbar-width: none; height: 80%"
      @menu-item-click="onClick"
    >
      <a-menu-item v-for="comp in company_list" :key="comp">
        {{ comp }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import logo from "~/assets/imgs/logo.png";
import { useCounter } from "~/store/counter";

const counter = useCounter();
const company_list = ref<string[]>([]);
// const active_comp = ref<string>();

const onClick = (key: string) => {
  console.log(key);
  counter.active_comp = key;
};

const getCompany = () => {
  fetch("/company.csv")
    .then((response) => response.text())
    .then((data) => {
      company_list.value = data.split("\r\n").slice(1);
      // console.log(company_list.value); // 打印文件内容
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
getCompany();
</script>

<style>
.nav_left {
  background-color: #fff;
  margin: 40px 20px 20px 20px;
  border-radius: 20px;
  padding-bottom: 10px;
}

.addIcon {
  background-color: #5661f6;
  color: #fff;
  height: 32px;
  flex: 1;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.searchIcon {
  background-color: #000;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
}

.arco-menu-inner {
  scrollbar-width: none;
}

.comp-menu::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}
</style>
