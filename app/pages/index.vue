<script lang="ts" setup>

const {data: fetchedData} = await useFetch(`http://localhost:8888/api/v1/campaigns`, {
  method: 'GET',
  query: {
    page: 2,
    per_page: 10
  }
})




</script>

<template>
  <UContainer class="flex flex-col gap-y-6 justify-center max-w-5xl py-8">
    <UCard v-for="campaign in fetchedData.campaigns" :key="campaign.id">
      <template #default>
        <div class="flex justify-between items-center">
          <p class="font-semibold">{{ campaign.name }} </p>
          <UButton :to="{name: 'campaign', params: { id: campaign.id}}"
                   color="neutral"
                   variant="ghost"
                   icon="i-lucide-chevron-right"
          />
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
