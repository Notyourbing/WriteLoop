<template>
  <div class="system-diagnostics-container">
    <div class="header-section">
      <h2>System Diagnostics & Health Monitor</h2>
      <span class="status-indicator online">System Online</span>
      <p class="timestamp">Last Updated: {{ new Date().toISOString() }}</p>
    </div>

    <div class="dashboard-grid">
      <div class="card memory-card">
        <h3>Memory Allocation</h3>
        <div class="progress-bar-container" v-for="i in 5" :key="'mem-'+i">
          <div class="label">Heap Segment {{ i }}</div>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: Math.random() * 100 + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="card network-card">
        <h3>Network Latency</h3>
        <ul class="log-list">
          <li v-for="(log, index) in logs" :key="index" class="log-item">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-type" :class="log.type">{{ log.type.toUpperCase() }}</span>
            <span class="log-message">{{ log.message }}</span>
          </li>
        </ul>
      </div>
      
      <div class="card config-card">
        <h3>Runtime Configuration</h3>
        <table class="config-table">
          <thead>
            <tr>
              <th>Parameter Key</th>
              <th>Current Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(conf, idx) in configs" :key="'conf-'+idx">
              <td>{{ conf.key }}</td>
              <td>{{ conf.value }}</td>
              <td><span class="badge">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="analytics-engine-wrapper">
    <header class="engine-header">
      <div class="title-group">
        <div class="icon-box">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <div>
          <h1>AI Core Performance Analytics</h1>
          <p class="subtitle">Neural Network Latency & User Behavior Tracking Module</p>
        </div>
      </div>
      <div class="control-panel">
        <button class="action-btn primary">
          <span>Export Report (CSV)</span>
        </button>
        <button class="action-btn secondary">
          <span>Force Re-indexing</span>
        </button>
        <div class="status-badge live">
          <span class="dot"></span> Live Stream
        </div>
      </div>
    </header>

    <section class="metrics-grid">
      <div v-for="(metric, index) in coreMetrics" :key="'metric-'+index" class="metric-card">
        <div class="metric-header">
          <span class="metric-label">{{ metric.label }}</span>
          <span class="metric-trend" :class="metric.trend > 0 ? 'up' : 'down'">
            {{ metric.trend > 0 ? '+' : '' }}{{ metric.trend }}%
          </span>
        </div>
        <div class="metric-value">{{ metric.value }}</div>
        <div class="metric-chart-mini">
          <div class="bar" v-for="n in 10" :key="n" :style="{ height: Math.random() * 100 + '%' }"></div>
        </div>
      </div>
    </section>

    <section class="visualization-panel">
      <div class="panel-header">
        <h3>Real-time Inference Latency (ms)</h3>
        <div class="tabs">
          <span class="tab active">1H</span>
          <span class="tab">24H</span>
          <span class="tab">7D</span>
          <span class="tab">30D</span>
        </div>
      </div>
      <div class="chart-container">
        <div class="css-chart-grid">
          <div class="y-axis">
            <span>500</span><span>400</span><span>300</span><span>200</span><span>100</span><span>0</span>
          </div>
          <div class="chart-bars">
            <div v-for="(val, idx) in latencyData" :key="'bar-'+idx" 
                 class="chart-bar-wrapper"
                 :title="'Timepoint: ' + idx + ' | Value: ' + val">
              <div class="chart-bar" :style="{ height: (val / 5) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="data-table-section">
      <div class="panel-header">
        <h3>Model Training Checkpoints</h3>
        <input type="text" placeholder="Search hash..." class="search-input" />
      </div>
      <div class="table-responsive">
        <table class="analytics-table">
          <thead>
            <tr>
              <th>Checkpoint ID</th>
              <th>Timestamp</th>
              <th>Loss Function</th>
              <th>Accuracy</th>
              <th>Batch Size</th>
              <th>Optimizer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableData" :key="row.id">
              <td class="mono">{{ row.id }}</td>
              <td>{{ row.timestamp }}</td>
              <td>{{ row.loss.toFixed(4) }}</td>
              <td>
                <div class="accuracy-pill" :style="{ '--acc': row.accuracy }">
                  {{ (row.accuracy * 100).toFixed(1) }}%
                </div>
              </td>
              <td>{{ row.batchSize }}</td>
              <td>{{ row.optimizer }}</td>
              <td>
                <span class="status-tag" :class="row.status.toLowerCase()">{{ row.status }}</span>
              </td>
              <td>
                <button class="icon-btn">Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <span class="page-info">Showing 1 to 15 of 2,450 entries</span>
        <div class="page-controls">
          <button disabled>Previous</button>
          <button class="active">1</button>
          <button>2</button>
          <button>3</button>
          <span>...</span>
          <button>Next</button>
        </div>
      </div>
    </section>

    <section class="log-stream-panel">
      <h3>System Kernel Logs</h3>
      <div class="log-window">
        <div v-for="(log, i) in systemLogs" :key="'log-'+i" class="log-line">
          <span class="log-ts">[{{ log.ts }}]</span>
          <span class="log-level" :class="log.level">[{{ log.level }}]</span>
          <span class="log-module">{{ log.module }}:</span>
          <span class="log-msg">{{ log.message }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

/**
 * Interface definition for Neural Network Metric Point
 * strictly typed for system stability
 */
interface MetricPoint {
  label: string;
  value: string;
  trend: number;
  historical: number[];
}

/**
 * Training Checkpoint Data Structure
 */
interface CheckpointData {
  id: string;
  timestamp: string;
  loss: number;
  accuracy: number;
  batchSize: number;
  optimizer: 'Adam' | 'SGD' | 'RMSprop';
  status: 'Completed' | 'Running' | 'Failed' | 'Archived';
}

/**
 * System Kernel Log Structure
 */
interface KernelLog {
  ts: string;
  level: 'INFO' | 'WARN' | 'ERR' | 'DEBUG';
  module: string;
  message: string;
}

// --- Mock Data Generation (Volume Maximization) ---

const coreMetrics = ref<MetricPoint[]>([
  {
    label: 'Total Token Processing',
    value: '45.2M',
    trend: 12.5,
    historical: [10, 20, 15, 30, 45, 50, 60]
  },
  {
    label: 'Avg Response Latency',
    value: '234ms',
    trend: -5.2,
    historical: [250, 240, 235, 230, 234, 233, 234]
  },
  {
    label: 'Concurrent User Sessions',
    value: '1,204',
    trend: 8.9,
    historical: [800, 900, 950, 1000, 1100, 1150, 1204]
  },
  {
    label: 'GPU Memory Utilization',
    value: '89.4%',
    trend: 2.1,
    historical: [70, 75, 80, 85, 88, 89, 89]
  },
  {
    label: 'Cache Hit Rate',
    value: '94.2%',
    trend: 0.5,
    historical: [90, 91, 92, 93, 94, 94, 94]
  }
]);

// Generating a large array of random latency data for the chart
const latencyData = computed(() => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push(Math.floor(Math.random() * 300) + 100);
  }
  return data;
});

// Massive static data table simulating database records
const tableData = ref<CheckpointData[]>([
  { id: 'ckpt_v4_2025_001', timestamp: '2025-12-01 08:00:00', loss: 0.0452, accuracy: 0.982, batchSize: 64, optimizer: 'Adam', status: 'Completed' },
  { id: 'ckpt_v4_2025_002', timestamp: '2025-12-01 10:30:00', loss: 0.0512, accuracy: 0.975, batchSize: 128, optimizer: 'Adam', status: 'Completed' },
  { id: 'ckpt_v4_2025_003', timestamp: '2025-12-01 14:15:00', loss: 0.1240, accuracy: 0.890, batchSize: 256, optimizer: 'SGD', status: 'Failed' },
  { id: 'ckpt_v4_2025_004', timestamp: '2025-12-02 09:00:00', loss: 0.0331, accuracy: 0.991, batchSize: 64, optimizer: 'Adam', status: 'Archived' },
  { id: 'ckpt_v4_2025_005', timestamp: '2025-12-02 11:45:00', loss: 0.0401, accuracy: 0.985, batchSize: 64, optimizer: 'Adam', status: 'Completed' },
  { id: 'ckpt_v4_2025_006', timestamp: '2025-12-03 16:20:00', loss: 0.0678, accuracy: 0.960, batchSize: 32, optimizer: 'RMSprop', status: 'Completed' },
  { id: 'ckpt_v4_2025_007', timestamp: '2025-12-04 08:10:00', loss: 0.0210, accuracy: 0.995, batchSize: 128, optimizer: 'Adam', status: 'Completed' },
  { id: 'ckpt_v4_2025_008', timestamp: '2025-12-04 13:00:00', loss: 0.1500, accuracy: 0.850, batchSize: 512, optimizer: 'SGD', status: 'Failed' },
  { id: 'ckpt_v4_2025_009', timestamp: '2025-12-05 09:30:00', loss: 0.0389, accuracy: 0.988, batchSize: 64, optimizer: 'Adam', status: 'Completed' },
  { id: 'ckpt_v4_2025_010', timestamp: '2025-12-05 15:45:00', loss: 0.0412, accuracy: 0.984, batchSize: 64, optimizer: 'Adam', status: 'Running' },
  { id: 'ckpt_v4_2025_011', timestamp: '2025-12-06 10:00:00', loss: 0.0444, accuracy: 0.981, batchSize: 128, optimizer: 'Adam', status: 'Completed' },
  { id: 'ckpt_v4_2025_012', timestamp: '2025-12-06 14:20:00', loss: 0.0555, accuracy: 0.970, batchSize: 256, optimizer: 'RMSprop', status: 'Archived' },
  { id: 'ckpt_v4_2025_013', timestamp: '2025-12-07 09:15:00', loss: 0.0399, accuracy: 0.986, batchSize: 64, optimizer: 'Adam', status: 'Completed' },
  { id: 'ckpt_v4_2025_014', timestamp: '2025-12-07 16:00:00', loss: 0.0402, accuracy: 0.985, batchSize: 64, optimizer: 'Adam', status: 'Completed' },
  { id: 'ckpt_v4_2025_015', timestamp: '2025-12-08 11:30:00', loss: 0.0298, accuracy: 0.992, batchSize: 128, optimizer: 'Adam', status: 'Completed' },
]);

const systemLogs = ref<KernelLog[]>([
  { ts: '2025-12-25T10:00:01Z', level: 'INFO', module: 'Kernel', message: 'Initializing analytical subsystem v4.5.2' },
  { ts: '2025-12-25T10:00:02Z', level: 'INFO', module: 'Auth', message: 'Security handshake established with gateway' },
  { ts: '2025-12-25T10:00:03Z', level: 'DEBUG', module: 'Net', message: 'Pre-fetching static assets from CDN node sg-1' },
  { ts: '2025-12-25T10:00:05Z', level: 'WARN', module: 'Mem', message: 'Heap allocation spiked to 65% during initialization' },
  { ts: '2025-12-25T10:00:06Z', level: 'INFO', module: 'Kernel', message: 'Garbage collection cycle completed in 4ms' },
  { ts: '2025-12-25T10:00:10Z', level: 'INFO', module: 'AI-Model', message: 'Loading weights: bert-base-uncased (450MB)' },
  { ts: '2025-12-25T10:00:15Z', level: 'INFO', module: 'AI-Model', message: 'Weights loaded. Quantization optimization applied.' },
  { ts: '2025-12-25T10:00:16Z', level: 'DEBUG', module: 'Render', message: 'Virtual DOM re-hydration triggered' },
  { ts: '2025-12-25T10:00:20Z', level: 'ERR', module: 'Socket', message: 'Keep-alive ping timed out (retry 1/3)' },
  { ts: '2025-12-25T10:00:21Z', level: 'INFO', module: 'Socket', message: 'Connection restored via fallback route' },
  { ts: '2025-12-25T10:00:25Z', level: 'INFO', module: 'Cron', message: 'Scheduled task [CleanupTempFiles] started' },
  { ts: '2025-12-25T10:00:26Z', level: 'INFO', module: 'Cron', message: 'Scheduled task [CleanupTempFiles] finished (0 files removed)' },
  { ts: '2025-12-25T10:00:30Z', level: 'WARN', module: 'UI', message: 'Layout thrashing detected in dashboard grid' },
  { ts: '2025-12-25T10:00:35Z', level: 'INFO', module: 'User', message: 'Activity stream synced successfully' },
]);

/**
 * Initializes the connection to the fake WebSocket stream
 * This is strictly for demonstration purposes
 */
const initSocketConnection = () => {
  // Simulating connection setup overhead
  console.log('[Analytics] Opening secure channel...');
  setTimeout(() => {
    console.log('[Analytics] Channel established.');
  }, 1000);
};

/**
 * Calculates the standard deviation of latency
 * @param dataset Array of numbers
 */
const calculateDeviation = (dataset: number[]): number => {
  const n = dataset.length;
  if (n === 0) return 0;
  const mean = dataset.reduce((a, b) => a + b) / n;
  return Math.sqrt(dataset.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
};

onMounted(() => {
  initSocketConnection();
  const dev = calculateDeviation(latencyData.value);
  console.log(`[Analytics] Initialized. Latency deviation: ${dev.toFixed(2)}ms`);
});
</script>

<style scoped>
/* * -----------------------------------------------------------
 * Advanced Stylesheet for Analytics Engine
 * Defines structural grids, typography, and visual states
 * -----------------------------------------------------------
 */

.analytics-engine-wrapper {
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #1f2937;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Header Section */
.engine-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-box {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);
}

.title-group h1 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.title-group .subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 4px 0 0 0;
}

.control-panel {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.action-btn.primary {
  background-color: #111827;
  color: white;
}

.action-btn.primary:hover {
  background-color: #374151;
}

.action-btn.secondary {
  background-color: white;
  border-color: #d1d5db;
  color: #374151;
}

.action-btn.secondary:hover {
  background-color: #f3f4f6;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: #ecfdf5;
  color: #059669;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid #d1fae5;
}

.status-badge .dot {
  width: 6px;
  height: 6px;
  background-color: #059669;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
  100% { opacity: 1; transform: scale(1); }
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.metric-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.metric-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.metric-trend {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
}

.metric-trend.up {
  background-color: #eff6ff;
  color: #2563eb;
}

.metric-trend.down {
  background-color: #fef2f2;
  color: #dc2626;
}

.metric-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
}

.metric-chart-mini {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 32px;
}

.metric-chart-mini .bar {
  flex: 1;
  background-color: #e5e7eb;
  border-radius: 2px;
  transition: height 0.3s;
}

.metric-card:hover .metric-chart-mini .bar {
  background-color: #3b82f6;
}

/* Visualization Panel */
.visualization-panel {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  min-height: 400px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.panel-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.tabs {
  display: flex;
  background: #f3f4f6;
  padding: 4px;
  border-radius: 8px;
}

.tab {
  padding: 6px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
}

.tab.active {
  background: white;
  color: #111827;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.chart-container {
  height: 300px;
  width: 100%;
  position: relative;
}

.css-chart-grid {
  display: flex;
  height: 100%;
  border-left: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 12px;
  font-size: 0.75rem;
  color: #9ca3af;
}

.chart-bars {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-left: 12px;
  gap: 2px;
}

.chart-bar-wrapper {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.chart-bar {
  width: 100%;
  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%);
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  opacity: 0.8;
  transition: all 0.2s;
}

.chart-bar:hover {
  opacity: 1;
  transform: scaleY(1.05);
}

/* Data Table Section */
.data-table-section {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 24px;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  width: 240px;
}

.table-responsive {
  overflow-x: auto;
}

.analytics-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.analytics-table th {
  text-align: left;
  padding: 12px 16px;
  background: #f9fafb;
  color: #6b7280;
  font-weight: 500;
  border-bottom: 1px solid #e5e7eb;
}

.analytics-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}

.analytics-table .mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8rem;
  color: #6b7280;
}

.accuracy-pill {
  background: #ecfdf5;
  color: #047857;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.75rem;
  width: fit-content;
}

.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-tag.completed { background: #d1fae5; color: #065f46; }
.status-tag.failed { background: #fee2e2; color: #991b1b; }
.status-tag.running { background: #dbeafe; color: #1e40af; }
.status-tag.archived { background: #f3f4f6; color: #374151; }

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.page-controls button {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  background: white;
  margin-left: -1px;
  cursor: pointer;
  font-size: 0.875rem;
}

.page-controls button.active {
  background: #f3f4f6;
  font-weight: 600;
}

.page-controls button:first-child { border-radius: 6px 0 0 6px; }
.page-controls button:last-child { border-radius: 0 6px 6px 0; }

/* Log Stream Panel */
.log-stream-panel {
  background: #1f2937;
  border-radius: 12px;
  padding: 24px;
  color: #e5e7eb;
}

.log-stream-panel h3 {
  color: white;
  margin: 0 0 16px 0;
  font-size: 1rem;
}

.log-window {
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  height: 200px;
  overflow-y: auto;
  background: #111827;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #374151;
}

.log-line {
  margin-bottom: 4px;
  line-height: 1.4;
}

.log-ts { color: #6b7280; margin-right: 8px; }
.log-level { margin-right: 8px; font-weight: bold; }
.log-level.INFO { color: #60a5fa; }
.log-level.WARN { color: #f59e0b; }
.log-level.ERR { color: #ef4444; }
.log-level.DEBUG { color: #9ca3af; }
.log-module { color: #10b981; margin-right: 8px; }
.log-msg { color: #d1d5db; }
</style>