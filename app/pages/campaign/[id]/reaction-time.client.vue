<script setup lang="ts">
definePageMeta({
  name: 'campaign.reaction-time',
})
const route = useRoute()
const {data} = useFetch(`http://localhost:8888/api/v1/reaction-time`, {
  default: ()=>({
    average_time: null,
    median_time: null,
    min_time: null,
    max_time: null,
    percentile_90th: null,
    percentile_95th: null,
  }),
  query: {
    campaign_id: route.params.id,
  },
  lazy: true,
  immediate: true,
  method: 'GET',
})
const durFormatter = new Intl.DurationFormat("ru-RU")
const averageTime = computed(()=>data.value.average_time ? durFormatter.format(data.value.average_time) : '')
const medianTime = computed(()=>data.value.median_time ? durFormatter.format(data.value.median_time) : '')
const minTime = computed(()=>data.value.min_time ? durFormatter.format(data.value.min_time) : '')
const maxTime = computed(()=>data.value.max_time ? durFormatter.format(data.value.max_time) : '')
const percentile90th = computed(()=>data.value.percentile_90th ? durFormatter.format(data.value.percentile_90th) : '')
const percentile95th = computed(()=>data.value.percentile_95th ? durFormatter.format(data.value.percentile_95th) : '')
</script>

<template>
  <UCard class="w-full">
    <template #header>
      <div class="flex justify-between items-center">
        <p class="font-semibold">Скорость реакции клиентов</p>
      </div>
    </template>
    <template #default>
      <div class="flex flex-row flex-wrap gap-x-4 gap-y-4 justify-items-stretch">
        <UCard variant="subtle" class="w-fit grow">
          <div class="">
            <div class="flex items-center  justify-between">
              <h2 class="text-xl font-medium">{{averageTime}}</h2>
            </div>
            <p class="mb-1 text-(--ui-text-dimmed)">Среднее время</p>
          </div>
        </UCard>
        <UCard variant="subtle" class="w-fit grow">
          <div class="">
            <div class="flex items-center  justify-between">
              <h2 class="text-xl font-medium">{{medianTime}}</h2>
            </div>
            <p class="mb-1 text-(--ui-text-dimmed)">Медианное время</p>
          </div>
        </UCard>
        <UCard variant="subtle" class="w-fit grow">
          <div class="">
            <div class="flex items-center  justify-between">
              <h2 class="text-xl font-medium">{{minTime}}</h2>
            </div>
            <p class="mb-1 text-(--ui-text-dimmed)">Минимальное время</p>
          </div>
        </UCard>
        <UCard variant="subtle" class="w-fit grow">
          <div class="">
            <div class="flex items-center  justify-between">
              <h2 class="text-xl font-medium">{{maxTime}}</h2>
            </div>
            <p class="mb-1 text-(--ui-text-dimmed)">Максимальное время</p>
          </div>
        </UCard>
        <UCard variant="subtle" class="w-fit grow">
          <div class="">
            <div class="flex items-center  justify-between">
              <h2 class="text-xl font-medium">{{percentile90th}}</h2>
            </div>
            <p class="mb-1 text-(--ui-text-dimmed)">Процентиль 90%</p>
          </div>
        </UCard>
        <UCard variant="subtle" class="w-fit grow">
          <div class="">
            <div class="flex items-center  justify-between">
              <h2 class="text-xl font-medium">{{percentile95th}}</h2>
            </div>
            <p class="mb-1 text-(--ui-text-dimmed)">Процентиль 95%</p>
          </div>
        </UCard>
      </div>
    </template>
  </UCard>
</template>
