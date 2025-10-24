<template>
  <nav class="h-12 sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-md px-4 py-2 flex justify-between items-center">
    <!-- 修改为 router-link 以实现跳转 -->
    <router-link to="/" class="text-xl font-bold text-blue-500">
      <i class="fas fa-atom"></i> GUYI导航站
    </router-link>
    
    <!-- 修改搜索区域显示逻辑，添加时间和天气 -->
    <div class="hidden md:flex items-center gap-2 flex-1 max-w-2xl mx-4">
      <!-- 左侧时间显示 -->
      <div class="time-display flex flex-col items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1 min-w-[140px]">
        <div class="time text-sm font-semibold">{{ currentTime }}</div>
        <div class="date text-xs text-gray-500 dark:text-gray-400">{{ currentDate }}</div>
      </div>
      
      <div class="relative">
        <!-- 调整当前选择项的宽度和图标间距 -->
        <a href="javascript:;" 
          class="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1 flex items-center min-w-[120px]"
          @click="showEngines = !showEngines">
          <i :class="engineIcons[selectedEngine]" class="mr-2 text-sm w-4"></i>
          <span class="truncate">{{ engines[selectedEngine].name }}</span>
        </a>
        
        <!-- 调整下拉菜单宽度和选项对齐 -->
        <div v-show="showEngines" 
          class="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg min-w-[160px] z-50">
          <a 
            v-for="(engine, key) in engines" 
            href="javascript:;" 
            class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            @click="selectedEngine = key; showEngines = false"
          >
            <i :class="engineIcons[key]" class="mr-3 w-4 text-center"></i>
            <span class="truncate">{{ engine.name }}</span>
          </a>
        </div>
      </div>

      <!-- 保持原有的 input 和 button 不变 -->
      <input
        type="text"
        v-model="searchQuery"
        :placeholder="engines[selectedEngine].placeholder"
        class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-1"
        @keyup.enter="search"
      />
      <button 
        @click="search"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
      >
        <i class="fas fa-search"></i>  <!-- 使用Font Awesome的搜索图标 -->
      </button>
      
      <!-- 右侧天气显示 -->
      <div class="weather-display flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1 min-w-[140px]">
        <i class="fas text-lg mr-2" :class="weatherIcon"></i>
        <div class="weather-info flex flex-col">
          <div class="weather-temp text-sm font-semibold">{{ weather.temp }}°C</div>
          <div class="weather-desc text-xs text-gray-500 dark:text-gray-400">{{ weather.desc }}</div>
        </div>
      </div>
    </div>
    
    <!-- 右侧按钮区域 -->
    <div class="flex items-center gap-3">
      <!-- 新增设置按钮 -->
      <router-link 
        to="/settings"
        class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
      >
        <i class="fas fa-cog hover:rotate-90 transition-transform duration-300"></i>
      </router-link>
      <!-- 新增GitHub图标 -->
      <a 
        href="https://github.com" 
        target="_blank"
        class="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
      >
        <i class="fab fa-github text-xl hover:rotate-12 transition-transform"></i>
      </a>
      
      <!-- 原有的暗黑模式切换按钮 -->
      <button 
        @click="$emit('toggleDarkMode')" 
        class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
      >
        <i class="fas hover:rotate-12 transition-transform" :class="darkMode ? 'fa-sun' : 'fa-moon' "></i>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['darkMode'],
  data() {
    return {
      showEngines: false,
      searchQuery: '',
      selectedEngine: 'bing',
      engines: {
        bing: { 
          name: 'Bing', 
          url: 'https://www.bing.com/search?q=', 
          placeholder: '必应搜索...' 
        },
        baidu: { 
          name: '百度', 
          url: 'https://www.baidu.com/s?wd=', 
          placeholder: '百度一下...' 
        },
        google: { 
          name: '谷歌', 
          url: 'https://www.google.com/search?q=',
          placeholder: 'Google搜索...' 
        },
        local: { 
          name: '本地', 
          url: '/search?q=',
          placeholder: '站内搜索...' 
        }
      },
      engineIcons: {
        bing: 'fab fa-microsoft',
        baidu: 'fas fa-paw',
        google: 'fab fa-google', 
        local: 'fas fa-search'
      },
      // 新增时间和天气相关数据
      currentTime: '00:00:00',
      currentDate: '2023年1月1日',
      weather: {
        temp: '24',
        desc: '晴朗'
      },
      weatherTimer: null,
      timeTimer: null
    };
  },
  computed: {
    // 根据天气描述返回对应的图标
    weatherIcon() {
      const desc = this.weather.desc.toLowerCase();
      if (desc.includes('晴')) return 'fa-sun text-yellow-500';
      if (desc.includes('云')) return 'fa-cloud text-gray-400';
      if (desc.includes('雨')) return 'fa-cloud-rain text-blue-400';
      if (desc.includes('雪')) return 'fa-snowflake text-blue-200';
      return 'fa-cloud text-gray-400';
    }
  },
  methods: {
    search() {
      if (this.searchQuery.trim()) {
        if (this.selectedEngine === 'local') {
          // 使用 router 进行跳转
          this.$router.push({ 
            path: '/search',
            query: { q: this.searchQuery.trim() }
          });
        } else {
          const url = this.engines[this.selectedEngine].url + encodeURIComponent(this.searchQuery);
          window.open(url, '_blank');
        }
      }
    },
    // 新增方法：更新时间
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString('zh-CN');
      this.currentDate = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    // 新增方法：获取天气数据（模拟）
    getWeatherData() {
      // 这里应该是调用天气API的代码
      // 由于是示例，我们使用模拟数据
      const weatherConditions = [
        { temp: 24, desc: '晴朗' },
        { temp: 18, desc: '多云' },
        { temp: 15, desc: '小雨' },
        { temp: 22, desc: '局部多云' }
      ];
      
      // 随机选择一个天气条件（模拟天气变化）
      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      this.weather = randomWeather;
    }
  },
  mounted() {
    // 初始化时间
    this.updateTime();
    
    // 设置定时器，每秒更新时间
    this.timeTimer = setInterval(() => {
      this.updateTime();
    }, 1000);
    
    // 获取天气数据
    this.getWeatherData();
    
    // 设置定时器，每10分钟更新一次天气（模拟）
    this.weatherTimer = setInterval(() => {
      this.getWeatherData();
    }, 600000); // 10分钟
  },
  beforeUnmount() {
    // 清除定时器
    if (this.timeTimer) clearInterval(this.timeTimer);
    if (this.weatherTimer) clearInterval(this.weatherTimer);
  }
};
</script>

<style scoped>
/* 原有的样式保持不变 */

/* 新增时间和天气样式 */
.time-display, .weather-display {
  transition: all 0.3s ease;
}

.time-display:hover, .weather-display:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.dark .time-display:hover, .dark .weather-display:hover {
  box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .time-display, .weather-display {
    min-width: 120px;
    font-size: 0.8rem;
  }
  
  .time, .weather-temp {
    font-size: 0.9rem;
  }
  
  .date, .weather-desc {
    font-size: 0.7rem;
  }
}
</style>
