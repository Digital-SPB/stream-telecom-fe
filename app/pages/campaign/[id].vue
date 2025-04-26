<script setup lang="ts">
definePageMeta({
  name: 'campaign'
})
import type {TabsItem} from '@nuxt/ui'

const categories: Record<string, any> = {
  clicks: {name: 'Переходы', color: '#6aa1fd'}, // Nuxt primary green color
}
const route = useRoute()


const data = [
  {
    date: '1ч',
    clicks: 2100,
  },
  {
    date: '2ч',
    clicks: 1200,
  },
  {
    date: '3ч',
    clicks: 1650,
  },
  {
    date: '4ч',
    clicks: 1900,
  },
  {
    date: '5ч',
    clicks: 1400,
  },
  {
    date: '6ч',
    clicks: 1000,
  },
  {
    date: '7ч',
    clicks: 1111,
  },
  {
    date: '8ч',
    clicks: 5100,
  },
  {
    date: '9ч',
    clicks: 3200,
  },
  {
    date: '10ч',
    clicks: 1234,
  },
  {
    date: '11ч',
    clicks: 1450,
  },
  {
    date: '12ч',
    clicks: 2000,
  },
  {
    date: '13ч',
    clicks: 1964,
  },
  {
    date: '14ч',
    clicks: 1945,
  },
  {
    date: '15ч',
    clicks: 500,
  },
  {
    date: '16ч',
    clicks: 1200,
  },
]
const filteredData = computed(() => data.filter((item, index) => index % activeTab.value))
const xFormatter = (i: number) => {
  if (i % activeTab.value === 0) return data[i]?.date
  else return ''
}

const tabs = ref<TabsItem[]>([
  {label: '2ч', value: 2},
  {label: '4ч', value: 4},
  {label: '8ч', value: 8},
  {label: '16ч', value: 16}
])
const activeTab = ref<number>(16)

const {data: graphInfo, error} = await useFetch(`http://localhost:8888/api/v1/activity`, {
  method: 'GET',
  query: {
    campaign_id: route.params.id,
    count_hours: activeTab.value
  }
})
console.log(graphInfo.value)

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
              :data="graphInfo.hourly_clicks"
              :height="322"
              :legend-poisition="'Bottom'"
              :categories="categories"
              :y-num-ticks="5"
              :x-formatter="xFormatter"
              :curve-type="CurveType.MonotoneX"
          />
        </div>
      </template>
      <template #footer>
        {{ graphInfo }}
        {{error}}
      </template>
    </UCard>
  </UContainer>
</template>