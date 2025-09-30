<template>
  <a :href="item.url" target="_blank" 
     class="card-container flex items-start bg-white dark:bg-gray-700 p-3 sm:p-4 rounded shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] border-2 border-transparent relative">
    
    <!-- 调整图标大小 -->
    <img :src="item.icon" alt="icon" class="w-8 h-8 sm:w-12 sm:h-12 mr-3 sm:mr-4" />
    
    <div class="flex-1">
      <!-- 调整标题大小 -->
      <h3 class="text-base sm:text-lg font-bold">{{ item.name }}</h3>
      <!-- 调整描述文本 -->
      <p 
        class="desc-text text-xs sm:text-sm text-gray-600 dark:text-gray-400"
        :title="item.description"
      >
        {{ item.description }}
      </p>
    </div>
  </a>
</template>

<style scoped>
.desc-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  line-height: 1.4;
  word-break: break-all;
  box-sizing: border-box; 
}

/* 移除自定义提示框相关样式 */
.card-container:hover {
  animation: borderPulse 2s infinite;
}

@keyframes borderPulse {
  0% { border-color: rgba(216, 180, 254, 0.5); }
  50% { border-color: rgba(184, 61, 143, 0.8); }
  100% { border-color: rgba(216, 180, 254, 0.5); }
}

/* 修复黑暗模式样式 - 使用全局选择器 */
:global(.dark) .card-container:hover {
  animation: borderPulseDark 2s infinite;
}

@keyframes borderPulseDark {
  0% { border-color: rgba(147, 51, 234, 0.5); }
  50% { border-color: rgba(168, 85, 247, 0.8); }
  100% { border-color: rgba(147, 51, 234, 0.5); }
}
</style>

<script>
export default {
  props: ['item'],
};
</script>