<script setup lang="ts">
import type {TabsItem} from '@nuxt/ui'

definePageMeta({
  name: 'campaign'
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


interface AreaChartItem {
  date: string
  clickCount: number
  percentage: number
}

const barCategories: Record<string, BulletLegendItemInterface> = {
  clickCount: {name: 'Переходы'},
}

const BarChartData: AreaChartItem[] = [
  {date: '2024-04-01', clickCount: 222, percentage: 5},
  {date: '2024-04-02', clickCount: 180, percentage: 2},
  {date: '2024-04-03', clickCount: 167, percentage: 9},
  {date: '2024-04-04', clickCount: 172, percentage: 8},
  {date: '2024-04-05', clickCount: 184, percentage: 2},
  {date: '2024-04-06', clickCount: 195, percentage: 6},
  {date: '2024-04-07', clickCount: 198, percentage: 4},
  {date: '2024-04-08', clickCount: 205, percentage: 9},
  {date: '2024-04-09', clickCount: 210, percentage: 1},
  {date: '2024-04-10', clickCount: 219, percentage: 7},
  {date: '2024-04-11', clickCount: 224, percentage: 3},
  {date: '2024-04-12', clickCount: 230, percentage: 0},
]

const xBarFormatter = (i: number): string | number => {
  if (!BarChartData[i]?.date) {
    return ''
  }
  const date = new Date(BarChartData[i]?.date)
  return `${date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })}`
}

const timeTabs = ref<TabsItem[]>([
  {label: 'Дни', value: 1},
  {label: 'Месяцы', value: 2},
])
const activeTimeTab = ref<number>(1)
const formatTabs = ref<TabsItem[]>([
  {label: '123', value: 1},
  {label: '%', value: 2},
])
const activeFormatTab = ref<number>(1)




</script>

<template>
  <UContainer class="flex flex-col gap-y-6 justify-center max-w-5xl py-8">
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
    <UCard class="w-full">
      <template #header>
        <div class="flex justify-between items-center">
          <p class="font-semibold">Динамика кликов по кампании</p>
        </div>
      </template>
      <template #default>
        <div>
          <BarChart
              :data="BarChartData"
              :height="322"
              :categories="barCategories"
              :y-axis="['clickCount']"
              :group-padding="0"
              :bar-padding="0.2"
              :yNumTicks="4"
              :x-formatter="xBarFormatter"
              :legend-position="LegendPosition.Bottom"
          />
          <div class="flex justify-between">
            <UTabs v-model="activeTimeTab" color="info" :content="false" :items="timeTabs" size="md" class="w-sm"/>
            <UTabs v-model="activeFormatTab" color="info" :content="false" :items="formatTabs" size="md" class="w-sm"/>
          </div>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>