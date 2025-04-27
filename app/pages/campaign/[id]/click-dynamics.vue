<script setup lang="ts">
import type {TabsItem} from "@nuxt/ui";
definePageMeta({
  name: 'campaign.click-dynamics',
})
const route = useRoute()

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
</script>

<template>
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
            :y-num-ticks="4"
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
            :y-num-ticks="4"
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
            :y-num-ticks="4"
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
            :y-num-ticks="4"
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
</template>
