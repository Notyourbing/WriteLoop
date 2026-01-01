<template>
  <div class="trend-chart">
    <canvas ref="canvasRef" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

interface Props {
  labels: string[];
  values: number[];
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  width: 320,
  height: 240,
});

const canvasRef = ref<HTMLCanvasElement | null>(null);

function drawTrendChart() {
  if (!canvasRef.value) return;
  const ctx = canvasRef.value.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, props.width, props.height);

  if (!props.values.length || !props.labels.length) {
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('暂无练习数据', props.width / 2, props.height / 2);
    return;
  }

  const padding = { top: 16, right: 16, bottom: 32, left: 36 };
  const chartWidth = props.width - padding.left - padding.right;
  const chartHeight = props.height - padding.top - padding.bottom;

  const maxValue = Math.max(1, ...props.values);
  const stepX = props.values.length > 1 ? chartWidth / (props.values.length - 1) : 0;

  // Grid
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartHeight * i) / 4;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + chartWidth, y);
    ctx.stroke();
  }

  // Line
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  props.values.forEach((value, index) => {
    const x = padding.left + stepX * index;
    const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();

  // Points
  ctx.fillStyle = '#6366f1';
  props.values.forEach((value, index) => {
    const x = padding.left + stepX * index;
    const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Labels
  ctx.fillStyle = '#6b7280';
  ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  props.labels.forEach((label, index) => {
    const x = padding.left + stepX * index;
    const y = padding.top + chartHeight + 8;
    ctx.fillText(label, x, y);
  });
}

onMounted(() => {
  drawTrendChart();
});

watch(
  () => [props.labels, props.values],
  () => {
    drawTrendChart();
  },
  { deep: true }
);
</script>

<style scoped>
.trend-chart {
  width: 100%;
  display: flex;
  justify-content: center;
}

canvas {
  display: block;
}
</style>
