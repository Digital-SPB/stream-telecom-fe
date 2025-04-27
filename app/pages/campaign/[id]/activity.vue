<script setup lang="ts">
import type {TabsItem} from "@nuxt/ui";
definePageMeta({
   name: 'campaign.activity',
})

const categories: Record<string, any> = {
  clicks: {name: 'Переходы', color: '#6aa1fd'}, // Nuxt primary green color
}

const tabs = ref<TabsItem[]>([
  {label: '2ч', value: 2},
  {label: '4ч', value: 4},
  {label: '8ч', value: 8},
  {label: '16ч', value: 16}
])
const activeTab = ref<number>(2)
const route = useRoute()

const {data: graphInfo, error} = await useFetch(`http://localhost:8888/api/v1/activity`, {
  method: 'GET',
  query: {
    campaign_id: route.params.id,
    count_hours: 16
  }
})
const filteredData = computed(() => graphInfo.value.hourly_clicks.filter((item, index: number) => index <= activeTab.value))
const xFormatter = (i: number) => filteredData.value[i]?.hour
</script>

<template>
  <UCard class="w-full">
    <template #header>
      <div class="flex justify-between items-center">
        <p class="font-semibold">Активность пользователей на старте кампании</p>
        <UTabs v-model="activeTab" color="info" :content="false" :items="tabs" size="md" class="w-md"/>
      </div>
    </template>
    <template #default>
      <div>
        <LineChart
            :data="filteredData"
            :height="322"
            :legend-poisition="'Bottom'"
            :categories="categories"
            :y-num-ticks="5"
            :x-num-ticks="filteredData.length - 1"
            :x-formatter="xFormatter"
            :curve-type="CurveType.MonotoneX"
        />
      </div>
    </template>
  </UCard>
</template>
