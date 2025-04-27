<script setup lang="ts">
import percentile from "percentile";

const {data} = useFetch(`http://localhost:8888/api/v1/predict-best-time`, {
  default: () => ({
    day_stats: [],
    min: 0,
    max: 0,
  }),
  lazy: true,
  immediate: true,
  method: 'GET',
})
const heatMap = [
  'bg-blue-100',
  'bg-blue-200',
  'bg-blue-300',
  'bg-blue-400',
  'bg-blue-500',
  'bg-blue-600',
  'bg-blue-700',
  'bg-blue-800',
  'bg-blue-900',
];
const allValues = computed(() => data.value.day_stats.flatMap((day) => day.data.map((hour) => hour.y)))
const percentiles = computed<number[]>(() => percentile<number>(
    [10,
      20,
      30,
      40,
      50,
      60,
      70,
      80,
      90], allValues.value
))

const getHeat = (value: number) => {
  for (let i = 0; i < 9; i++) {
    if (value < percentiles.value[i]) {
      return i
    }
  }

  return 8
}
</script>

<template>
  <UCard class="w-full">
    <h1 class="font-bold text-center text-2xl mb-4">Анализ вовлечённости пользователей</h1>
    <div class="flex flex-col items-center gap-1">
      <div v-for="day in data.day_stats" :key="'day_' + day.name" class="flex gap-1 items-center">
        <p class="text-gray-400 w-7 h-5">{{ day.name }}</p>
        <UTooltip
            v-for="hour in day.data"
            :text="hour.y"
            :key="'day_'+day.name+':hour_'+hour.x">
          <div class="size-5 rounded-sm"
               :class="heatMap[getHeat(hour.y)]"></div>
        </UTooltip>
      </div>
      <div class="flex gap-1">
        <p class="text-gray-400 h-5 w-7"></p>
        <p class="text-gray-400 size-5 text-center" v-for="i in 24" :key="'hourtooltip_'+i">{{ i - 1 }}</p>
      </div>
    </div>
    <div class="flex justify-center gap-2 flex-wrap mt-6">
      <div class="flex gap-1 items-center"
           :key="i"
           v-for="i in 9">
        <div class="size-5 rounded-sm"
             :class="heatMap[i-1]"></div>
        <span>{{ (i === 1 ? 0 : percentiles[i - 2]) }}&ndash;{{ percentiles[i - 1] }}</span>
      </div>
    </div>
  </UCard>
</template>
