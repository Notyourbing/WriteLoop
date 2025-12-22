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

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface LogEntry {
  time: string;
  type: 'info' | 'warn' | 'error' | 'success';
  message: string;
}

const logs = ref<LogEntry[]>([
  { time: '10:00:01', type: 'info', message: 'Initializing generic rendering engine...' },
  { time: '10:00:02', type: 'success', message: 'Core modules loaded successfully.' },
  { time: '10:00:05', type: 'warn', message: 'Latency spike detected in sector 7.' },
  { time: '10:00:12', type: 'info', message: 'Garbage collection started.' },
  { time: '10:00:15', type: 'info', message: 'Synchronizing with upstream servers.' },
  { time: '10:01:00', type: 'error', message: 'Failed to retrieve non-critical asset map.' },
  { time: '10:01:30', type: 'info', message: 'Retrying connection pool allocation.' },
  { time: '10:02:15', type: 'success', message: 'Connection established via secure socket.' },
  { time: '10:03:00', type: 'info', message: 'User session verified.' },
  { time: '10:03:45', type: 'warn', message: 'Memory usage approaching threshold (heap).' },
  { time: '10:04:20', type: 'info', message: 'Clearing temporary cache buffers.' },
  { time: '10:05:00', type: 'success', message: 'System stable. Monitoring active.' },
  { time: '10:06:01', type: 'info', message: 'Received heartbeat from main process.' },
  { time: '10:07:30', type: 'info', message: 'Updating UI component tree.' },
  { time: '10:08:45', type: 'warn', message: 'Frame drop detected in render loop.' }
]);

const configs = ref([
  { key: 'MAX_THREAD_POOL', value: '16' },
  { key: 'RENDER_STRATEGY', value: 'Lazy' },
  { key: 'CACHE_TTL', value: '3600ms' },
  { key: 'DEBUG_MODE', value: 'False' },
  { key: 'API_ENDPOINT', value: '/v1/internal/health' },
  { key: 'THEME_PREFERENCE', value: 'System_Default' },
  { key: 'ANIMATION_SPEED', value: '1.5x' },
  { key: 'LOG_VERBOSITY', value: 'Verbose' },
  { key: 'RETRY_ATTEMPTS', value: '5' },
  { key: 'TIMEOUT_MS', value: '5000' }
]);

onMounted(() => {
  console.log('System Diagnostics Component Mounted - Silent Mode');
});
</script>

<style scoped>

.system-diagnostics-container {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-family: 'Courier New', Courier, monospace; 
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.status-indicator {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-indicator.online {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid #e9ecef;
}

.card h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #495057;
  border-bottom: 1px solid #f1f3f5;
  padding-bottom: 0.5rem;
}

/* 进度条样式 */
.progress-bar-container {
  margin-bottom: 1rem;
}

.label {
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  color: #6c757d;
}

.progress-track {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #007bff;
  transition: width 0.3s ease;
}

/* 日志列表样式 */
.log-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f8f9fa;
  font-size: 0.85rem;
}

.log-time {
  color: #adb5bd;
  min-width: 60px;
}

.log-type {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  text-transform: uppercase;
}

.log-type.info { background: #e7f5ff; color: #1971c2; }
.log-type.warn { background: #fff9db; color: #f08c00; }
.log-type.error { background: #ffe3e3; color: #e03131; }
.log-type.success { background: #ebfbee; color: #2f9e44; }

/* 表格样式 */
.config-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.config-table th, .config-table td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.config-table th {
  color: #868e96;
  font-weight: 500;
}

.badge {
  background-color: #e9ecef;
  color: #495057;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
}
</style>