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
// 引入axios用于API调用
import axios from 'axios';

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
      currentDate: '1月1日 星期一',
      weather: {
        temp: '--',
        desc: '加载中...'
      },
      weatherTimer: null,
      timeTimer: null,
      // 天气API配置
      weatherConfig: {
        apiKey: 'b3ac86e464ba40f58fdee7f3eaa8ea13', // 替换为您的和风天气API Key
        location: 'auto_ip', // 自动获取IP所在地，或指定城市ID如"101010100"(北京)
        apiUrl: 'https://devapi.qweather.com/v7/weather/now' // 和风天气API地址
      }
    };
  },
  computed: {
    // 根据天气代码返回对应的图标
    weatherIcon() {
      const code = this.weather.code;
      // 和风天气代码映射
      if ([100, 101, 102, 103].includes(code)) return 'fa-sun text-yellow-500'; // 晴
      if ([104, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 399].includes(code)) return 'fa-cloud text-gray-400'; // 阴/多云
      if ([400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410].includes(code)) return 'fa-cloud-rain text-blue-400'; // 雨
      if ([499, 500, 501, 502, 503, 504, 507, 508].includes(code)) return 'fa-snowflake text-blue-200'; // 雪
      if ([999].includes(code)) return 'fa-question text-gray-400'; // 未知
      return 'fa-cloud text-gray-400'; // 默认
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
    // 新增方法：更新时间（不显示年份）
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString('zh-CN');
      
      // 格式化日期：月日 星期（不显示年份）
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const weekday = weekdays[now.getDay()];
      
      this.currentDate = `${month}月${day}日 ${weekday}`;
    },
    // 新增方法：获取位置信息
    async getLocation() {
      try {
        // 使用IP定位获取城市信息
        const response = await axios.get(`https://geoapi.qweather.com/v2/city/ip?key=${this.weatherConfig.apiKey}&ip=auto`);
        if (response.data.code === '200') {
          return response.data.location[0].id; // 返回城市ID
        }
      } catch (error) {
        console.error('获取位置失败:', error);
      }
      return '101010100'; // 默认北京
    },
    // 新增方法：获取天气数据（真实API）
    async getWeatherData() {
      try {
        // 获取位置信息
        const locationId = await this.getLocation();
        
        // 调用和风天气API
        const response = await axios.get(`${this.weatherConfig.apiUrl}?key=${this.weatherConfig.apiKey}&location=${locationId}`);
        
        if (response.data.code === '200') {
          const weatherData = response.data.now;
          this.weather = {
            temp: weatherData.temp,
            desc: weatherData.text,
            code: parseInt(weatherData.icon)
          };
        } else {
          console.error('天气API返回错误:', response.data);
          this.weather = {
            temp: '--',
            desc: '获取失败',
            code: 999
          };
        }
      } catch (error) {
        console.error('获取天气数据失败:', error);
        this.weather = {
          temp: '--',
          desc: '网络错误',
          code: 999
        };
      }
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
    
    // 设置定时器，每30分钟更新一次天气
    this.weatherTimer = setInterval(() => {
      this.getWeatherData();
    }, 1800000); // 30分钟
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
