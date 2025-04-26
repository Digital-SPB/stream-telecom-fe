<script lang="ts" setup>

const page = ref<number>(1)
const perPage = 10

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
  <UContainer class="flex flex-col gap-y-6 justify-center max-w-5xl py-8">
    <UCard v-for="campaign in data.campaigns" :key="campaign.id">
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
        class="self-center"
        color="info"
        variant="neutral"
        active-color="info"
        active-variant="solid"
        show-edges
        :sibling-count="1"
        :total="data.total"/>
  </UContainer>
</template>
