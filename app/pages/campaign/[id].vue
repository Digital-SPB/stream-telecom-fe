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


const barCategories: Record<string, BulletLegendItemInterface> = {
  clicks_count: {name: 'Клики', color: '#6aa1fd'},
  percentage: {name: '%', color: '#fa3e76'}
}

const timeTabs = ref<TabsItem[]>([
  {label: 'Дни', value: 1},
  {label: 'Месяцы', value: 2},
])
const activeTimeTab = ref<number>(2)
const formatTabs = ref<TabsItem[]>([
  {label: '123', value: 1},
  {label: '%', value: 2},
])
const activeFormatTab = ref<number>(1)

const {data} = useFetch(`http://localhost:8888/api/v1/click-dynamic/` + route.params.id, {
  default: () => ({
    daily_stats: [],
    monthly_stats: []
  }),
  lazy: true,
  immediate: true,
  method: 'GET',
})
const monthlyData = computed(() => data.value.monthly_stats)
const dailyData = computed(() => data.value.daily_stats)
const monthFormatter = new Intl.DateTimeFormat('ru-RU', {
  month: 'long'
})
const dayFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'short'
})
const xBarMonthFormatter = (i: number): string | number => monthFormatter.format(Date.parse(monthlyData.value[i].month))

const xBarDayFormatter = (i) => dayFormatter.format(Date.parse(dailyData.value[i].date))


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
              v-if="activeTimeTab === 2 && activeFormatTab === 1"
              :data="monthlyData"
              :height="322"
              :categories="barCategories"
              :y-axis="['clicks_count']"
              :group-padding="0"
              :bar-padding="0.2"
              :yNumTicks="4"
              :x-formatter="xBarMonthFormatter"
              :legend-position="LegendPosition.Bottom"
          />
          <BarChart
              v-if="activeTimeTab === 2 && activeFormatTab === 2"
              :data="monthlyData"
              :height="322"
              :categories="barCategories"
              :y-axis="['percentage']"
              :group-padding="0"
              :bar-padding="0.2"
              :yNumTicks="4"
              :x-formatter="xBarMonthFormatter"
              :legend-position="LegendPosition.Bottom"
          />
          <BarChart
              v-if="activeTimeTab === 1 && activeFormatTab === 1"
              :data="dailyData"
              :height="322"
              :categories="barCategories"
              :y-axis="['clicks_count']"
              :group-padding="0"
              :bar-padding="0.2"
              :yNumTicks="4"
              :x-formatter="xBarDayFormatter"
              :legend-position="LegendPosition.Bottom"
          />
          <BarChart
              v-if="activeTimeTab === 1 && activeFormatTab === 2"
              :data="dailyData"
              :height="322"
              :categories="barCategories"
              :y-axis="['percentage']"
              :group-padding="0"
              :bar-padding="0.2"
              :yNumTicks="4"
              :x-formatter="xBarDayFormatter"
              :legend-position="LegendPosition.Bottom"
          />

          <div class="flex justify-between">
            <UTabs v-model="activeTimeTab" color="info" :content="false" :items="timeTabs" size="md" class="w-sm"/>
            <UTabs v-model="activeFormatTab" color="info" :content="false" :items="formatTabs" size="md" class="w-sm"/>
          </div>
        </div>
      </template>
      <template #footer>
        <p class="font-semibold">Всего кликов: {{data.total_clicks}}</p>
      </template>
    </UCard>
  </UContainer>
</template>