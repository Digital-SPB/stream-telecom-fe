<script setup lang="ts">
definePageMeta({
  name: 'campaign',
  redirect: {name: 'campaign.activity'}
})

const navigationItems = ref<NavigationMenuItem[]>([
  {
    label: 'Активность пользователей',
    icon: 'i-lucide-book-open',
    to: {name: 'campaign.activity'},
  },
  {
    label: 'Динамика кликов',
    icon: 'i-lucide-database',
    to: {name: 'campaign.click-dynamics'}
  },
  {
    label: 'Скорость реакции клиентов',
    icon: 'i-lucide-gauge',
    to: {name: 'campaign.reaction-time'}
  },
])
</script>

<template>
  <div class="flex flex-col gap-y-6 justify-center">
    <div class="flex justify-center">
      <UNavigationMenu
          orientation="horizontal"
          color="primary"
          :items="navigationItems"
      />
    </div>
    <NuxtPage/>
  </div>
</template>
