<template>
  <div class="essay-detail-container">
    <div class="essay-detail-shell">
      <div class="essay-detail-header">
        <div class="header-left">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="title">IELTS Model Essay</span>
        </div>
        <div class="header-actions">
          <router-link to="/essays" class="back-btn">← Back to List</router-link>
        </div>
      </div>

      <div v-if="isLoading" class="loading">Loading essay...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="essay" class="essay-content">
        <!-- Essay metadata -->
        <div class="essay-metadata">
          <div class="metadata-item">
            <span class="metadata-label">Essay #</span>
            <span class="metadata-value">{{ essay.essay_number }}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Word Count</span>
            <span class="metadata-value">{{ essay.word_count_actual }} words</span>
          </div>
          <div class="metadata-item" v-if="hasRead(essay.essay_number)">
            <span class="read-indicator">✓ Read</span>
          </div>
        </div>

        <!-- Essay title -->
        <h1 class="essay-title">{{ essay.title }}</h1>

        <!-- Essay question -->
        <div class="essay-question-section">
          <div class="section-label">Question:</div>
          <div class="essay-question">{{ essay.question }}</div>
        </div>

        <!-- Essay body -->
        <div class="essay-body-section">
          <div class="section-label">Model Answer:</div>
          <div class="essay-body">
            <div
              v-for="(paragraph, index) in essay.body_paragraphs"
              :key="index"
              class="essay-paragraph"
            >
              {{ paragraph }}
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="essay-navigation">
          <button 
            v-if="essay.essay_number > 1"
            @click="goToEssay(essay.essay_number - 1)"
            class="nav-btn prev-btn"
          >
            ← Previous
          </button>
          <button 
            v-if="essay.essay_number < 20"
            @click="goToEssay(essay.essay_number + 1)"
            class="nav-btn next-btn"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getApiUrl, config } from '../config';
import { useReadingHistory } from '../composables/useReadingHistory';

interface Essay {
  essay_number: number;
  title: string;
  question: string;
  word_count_actual: number;
  body_paragraphs: string[];
  body_text: string;
}

const route = useRoute();
const router = useRouter();
const { addToHistory, hasRead } = useReadingHistory();

const essay = ref<Essay | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

const loadEssay = async (essayId: number) => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await fetch(getApiUrl(`${config.api.endpoints.essays}/${essayId}`));
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Essay not found');
      }
      throw new Error('Failed to load essay');
    }
    const data = await response.json();
    essay.value = data.essay;
    
    // Record reading history
    if (essay.value) {
      addToHistory(essay.value.essay_number);
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error';
  } finally {
    isLoading.value = false;
  }
};

const goToEssay = (essayId: number) => {
  router.push(`/essays/${essayId}`);
};

onMounted(() => {
  const essayId = parseInt(route.params.id as string, 10);
  if (essayId) {
    loadEssay(essayId);
  } else {
    error.value = 'Invalid essay ID';
  }
});

watch(() => route.params.id, (newId) => {
  if (newId) {
    const essayId = parseInt(newId as string, 10);
    if (essayId) {
      loadEssay(essayId);
    }
  }
});
</script>

<style scoped>
.essay-detail-container {
  min-height: 100vh;
  background: #ffffff;
  padding: 20px;
  overflow-y: auto;
}

.essay-detail-shell {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.essay-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #dee2e6;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #212529;
}

.back-btn {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;
}

.back-btn:hover {
  background: #0056b3;
}

.loading,
.error {
  padding: 40px;
  text-align: center;
  font-size: 18px;
  color: #6c757d;
}

.error {
  color: #dc3545;
}

.essay-content {
  padding: 40px;
}

.essay-metadata {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e9ecef;
}

.metadata-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metadata-label {
  font-size: 12px;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metadata-value {
  font-size: 16px;
  font-weight: 600;
  color: #212529;
}

.read-indicator {
  background: #28a745;
  color: white;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.essay-title {
  font-size: 32px;
  font-weight: 700;
  color: #212529;
  margin-bottom: 30px;
  line-height: 1.3;
}

.essay-question-section,
.essay-body-section {
  margin-bottom: 40px;
}

.section-label {
  font-size: 14px;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.essay-question {
  font-size: 18px;
  color: #495057;
  line-height: 1.6;
  padding: 20px;
  background: #f8f9fa;
  border-left: 4px solid #007bff;
  border-radius: 8px;
}

.essay-body {
  font-size: 16px;
  line-height: 1.8;
  color: #212529;
}

.essay-paragraph {
  margin-bottom: 24px;
  text-align: justify;
}

.essay-paragraph:last-child {
  margin-bottom: 0;
}

.essay-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid #e9ecef;
}

.nav-btn {
  padding: 12px 24px;
  border: 2px solid #007bff;
  background: white;
  color: #007bff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: #007bff;
  color: white;
}

.prev-btn {
  margin-right: auto;
}

.next-btn {
  margin-left: auto;
}
</style>

