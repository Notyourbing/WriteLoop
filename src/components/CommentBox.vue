<template>
  <div class="comment-box-wrapper" v-if="visible">
    <div class="comment-box">
      <textarea
        v-model="commentText"
        placeholder="Input Your Comment..."
        rows="3"
        class="comment-textarea"
      ></textarea>
      <div class="comment-actions">
        <button @click="handleSave" class="action-btn save-btn">Save</button>
        <button @click="handleCancel" class="action-btn cancel-btn">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  visible: Boolean,
});

const emit = defineEmits(['save', 'cancel']);

const commentText = ref('');

watch(() => props.visible, (newValue) => {
  if (!newValue) {
    commentText.value = ''; // Hide and clear
  }
});

function handleSave() {
  if (commentText.value.trim()) {
    emit('save', commentText.value.trim());
  }
}

function handleCancel() {
  emit('cancel');
}
</script>

<style scoped>
.comment-box-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  width: 300px;
  border: 1px solid #e2e8f0;
}

.comment-box {
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.comment-textarea {
  width: 100%;
  box-sizing: border-box; 
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  resize: vertical;
  margin-bottom: 12px;
  outline: none;
  transition: border-color 0.2s;
}

.comment-textarea:focus {
  border-color: #4f46e5;
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-btn {
  background-color: #1e40af;
  color: white;
}

.save-btn:hover {
  background-color: #1e3a8a;
}

.cancel-btn {
  background-color: #f1f5f9;
  color: #475569;
}

.cancel-btn:hover {
  background-color: #e2e8f0;
}
</style>
