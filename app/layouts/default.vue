<script setup lang="ts">
import LogoStreamTelecom from '~/assets/img/streamtelecom_logo.svg'
import LogoSolidTeam from '~/assets/img/solid_team_logo.svg'
import type {NavigationMenuItem} from "#ui/components/NavigationMenu.vue";

const navigationItems = ref<NavigationMenuItem[]>([
  {
    label: 'Список рекламных кампаний',
    icon: 'i-lucide-book-open',
    to: '/'
  },
  {
    label: 'Анализ вовлечённости пользователей',
    icon: 'i-lucide-database',
    to: {name: 'engagement'}
  },
  {
    label: 'Динамика создания кампаний',
    icon: 'i-lucide-gauge',
    to: {name: 'create-campaign-dynamic'}
  },
])
</script>
<template>
  <div class="min-h-screen w-full bg-gray-100 dark:bg-gray-800">
    <header class="flex flex-col justify-center items-center w-full pt-8 pb-4 gap-4">
      <LogoStreamTelecom class="cursor-pointer max-h-16 h-full" @click="navigateTo('/')"/>
      <h1 class="text-4xl font-black">Аналитика рекламных кампаний</h1>
    </header>
    <main>
      <UContainer class="max-w-5xl py-8">
        <div class="flex justify-center">
          <UNavigationMenu
              class="mb-4"
              orientation="horizontal"
              color="primary"
              :items="navigationItems"
          />
        </div>
        <slot/>
      </UContainer>
    </main>
    <footer class="pt-6 pb-10 flex justify-center items-center gap-4">
      Сделано с любовью командой
      <LogoSolidTeam class="max-h-12"/>
      в 2025 году
    </footer>
  </div>
</template>
