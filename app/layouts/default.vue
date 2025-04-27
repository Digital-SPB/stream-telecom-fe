<script setup lang="ts">
import LogoStreamTelecom from '~/assets/img/streamtelecom_logo.svg'
import LogoSolidTeam from '~/assets/img/solid_team_logo.svg'
</script>
<template>
  <div class="min-h-screen w-full bg-gray-100 dark:bg-gray-800">
    <header class="flex flex-col justify-center items-center w-full pt-8 pb-4 gap-4">
      <LogoStreamTelecom class="max-h-16 h-full"/>
      <h1 class="text-4xl font-black">Аналитика рекламных кампаний</h1>
    </header>
    <main>
      <slot/>
    </main>
    <footer class="pt-6 pb-10 flex justify-center items-center gap-4">
      Сделано с любовью командой
      <LogoSolidTeam class="max-h-12"/>
      в 2025 году
    </footer>
  </div>
</template>
