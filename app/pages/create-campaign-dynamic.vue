<script setup lang="ts">
import type {TabsItem} from "@nuxt/ui";
import {CalendarDate} from '@internationalized/date'

definePageMeta({
  name: 'create-campaign-dynamic',
})

const categories: Record<string, any> = {
  count: {name: 'Количество', color: '#6aa1fd'}, // Nuxt primary green color
}

const tabs = ref<TabsItem[]>([
  {label: 'Дни', value: 1},
  {label: 'Месяцы', value: 2},
])
const activeTab = ref<number>(1)
const route = useRoute()
const dayFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'short'
})
const period = ref({start: new CalendarDate(2024, 4, 24), end: new CalendarDate(2025, 1, 1)})
const periodStart = computed(() => period.value.start?.toString())
const periodEnd = computed(() => period.value.end?.toString())
const intervalType = computed(() => activeTab.value === 1 ? 'day' : 'month')
const {data} = useFetch(`http://localhost:8888/api/v1/create-campaign-dynamic`, {
  default: () => ([]),
  watch: [periodStart, periodEnd, intervalType],
  method: 'GET',
  query: {
    interval_type: intervalType,
    start_time: periodStart,
    end_time: periodEnd,
  }
})
const xFormatter = (i: number) => dayFormatter.format(Date.parse(data.value[i]?.date ?? new Date()))

</script>

<template>
  <UContainer class="max-w-5xl py-8">
    <UCard class="w-full">
      <template #header>
        <div class="flex justify-between items-center">
          <p class="font-semibold">Динамика создания кампаний</p>
          <UPopover>
            <UButton label="Выберите период" color="info" size="md" variant="soft"/>

            <template #content>
              <UCalendar v-model="period" range class="p-4"/>
            </template>
          </UPopover>

          <UTabs v-model="activeTab" color="info" :content="false" :items="tabs" size="sm" class="w-sm"/>
        </div>
      </template>
      <template #default>
        <div>
          <LineChart
              :data="data"
              :height="322"
              :legend-poisition="'Bottom'"
              :categories="categories"
              :y-num-ticks="5"
              :x-formatter="xFormatter"
              :curve-type="CurveType.MonotoneX"
          />
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
