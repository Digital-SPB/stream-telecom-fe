<script setup lang="ts">
definePageMeta({
  name: 'campaign'
})

const navigationItems = ref<NavigationMenuItem[]>([
    {
      label: 'Активность пользователей',
      icon: 'i-lucide-book-open',
      to: { name: 'campaign.activity' }
    },
    {
      label: 'Динамика кликов',
      icon: 'i-lucide-database',
      to: { name: 'campaign.click-dynamics' }
    },
])
</script>

<template>
  <UContainer class="flex flex-col gap-y-6 justify-center max-w-5xl py-8">
    <UNavigationMenu
        orientation="horizontal"
        color="primary"
        :items="navigationItems"
    />
    <NuxtPage />
  </UContainer>
</template>
