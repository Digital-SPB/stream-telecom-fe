<script lang="ts" setup>
import {useRouteQuery} from "@vueuse/router";
definePageMeta({
  name: 'home'
})

const page = useRouteQuery('page', '1', { transform: Number })
const perPage = 20

const {data} = useFetch(`http://localhost:8888/api/v1/campaigns`, {
  default: () => ({
    campaigns: [],
    total: 0
  }),
  lazy: true,
  immediate: true,
  method: 'GET',
  query: {
    page: page,
    per_page: perPage
  }
})
</script>

<template>
  <UContainer class="max-w-5xl py-8">
    <h1 class="font-bold text-center text-2xl mb-4">Выберите рекламную кампанию</h1>
    <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
      <UCard v-for="campaign in data.campaigns" :key="campaign.id"
             class="cursor-pointer hover:ring-primary transition-all"
             @click="navigateTo({name: 'campaign', params: { id: campaign.id}})">
        <template #default>
          <div class="flex justify-between items-center">
            <p class="font-semibold">{{ campaign.name }} </p>
            <UButton
                :to="{name: 'campaign', params: { id: campaign.id}}"
                color="neutral"
                variant="ghost"
                icon="i-lucide-chevron-right"
            />
          </div>
        </template>
      </UCard>
      <UPagination
          v-model:page="page"
          class="mx-auto col-span-full"
          color="info"
          variant="neutral"
          active-color="info"
          active-variant="solid"
          show-edges
          :sibling-count="1"
          :total="data.total"/>
    </div>
  </UContainer>
</template>
