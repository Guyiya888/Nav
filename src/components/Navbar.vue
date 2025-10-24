<template>
  <nav class="navbar">
    <!-- 左侧品牌标识 -->
    <div class="nav-brand">
      <i class="fas fa-atom"></i>
      <span>GUYI导航站</span>
    </div>
    
    <!-- 中间区域：时间 + 搜索 + 天气 -->
    <div class="nav-center">
      <!-- 时间显示 -->
      <div class="time-display">
        <div class="current-time">{{ currentTime }}</div>
        <div class="current-date">{{ currentDate }}</div>
      </div>
      
      <!-- 搜索区域 -->
      <div class="search-container">
        <div class="search-engine-selector">
          <button class="engine-btn" @click="toggleEngineDropdown">
            <i :class="currentEngine.icon"></i>
            <span>{{ currentEngine.name }}</span>
          </button>
          <div class="engine-dropdown" v-if="showEngineDropdown">
            <div 
              v-for="engine in searchEngines" 
              :key="engine.id"
              class="engine-option"
              @click="selectEngine(engine)"
            >
              <i :class="engine.icon"></i>
              <span>{{ engine.name }}</span>
            </div>
          </div>
        </div>
        
        <input 
          type="text" 
          class="search-input" 
          v-model="searchQuery"
          :placeholder="currentEngine.placeholder"
          @keyup.enter="performSearch"
        />
        
        <button class="search-btn" @click="performSearch">
          <i class="fas fa-search"></i>
        </button>
      </div>
      
      <!-- 天气显示 -->
      <div class="weather-display" @click="showCitySelector = true">
        <i class="weather-icon" :class="weatherIcon"></i>
        <div class="weather-info">
          <div class="temperature">{{ weather.temperature }}°C</div>
          <div class="description">{{ weather.city }} · {{ weather.description }}</div>
        </div>
      </div>
    </div>
    
    <!-- 右侧操作区域 -->
    <div class="nav-actions">
      <button class="nav-btn" @click="toggleDarkMode">
        <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
      </button>
      <button class="nav-btn">
        <i class="fas fa-cog"></i>
      </button>
    </div>
    
    <!-- 城市选择器模态框 -->
    <div class="city-selector-modal" v-if="showCitySelector">
      <div class="modal-content">
        <div class="modal-header">
          <h3>选择城市</h3>
          <button @click="showCitySelector = false">×</button>
        </div>
        <div class="modal-body">
          <input 
            type="text" 
            v-model="cityInput" 
            placeholder="输入城市名称"
            class="city-input"
          />
          <div class="popular-cities">
            <button 
              v-for="city in popularCities" 
              :key="city"
              class="city-btn"
              @click="selectCity(city)"
            >
              {{ city }}
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" @click="showCitySelector = false">取消</button>
          <button class="btn-confirm" @click="confirmCity">确认</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    darkMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentTime: '00:00:00',
      currentDate: '1月1日 星期一',
      searchQuery: '',
      showEngineDropdown: false,
      currentEngine: {
        id: 'bing',
        name: 'Bing',
        icon: 'fab fa-microsoft',
        url: 'https://www.bing.com/search?q=',
        placeholder: '必应搜索...'
      },
      searchEngines: [
        {
          id: 'bing',
          name: 'Bing',
          icon: 'fab fa-microsoft',
          url: 'https://www.bing.com/search?q=',
          placeholder: '必应搜索...'
        },
        {
          id: 'baidu',
          name: '百度',
          icon: 'fas fa-paw',
          url: 'https://www.baidu.com/s?wd=',
          placeholder: '百度一下...'
        },
        {
          id: 'google',
          name: '谷歌',
          icon: 'fab fa-google',
          url: 'https://www.google.com/search?q=',
          placeholder: 'Google搜索...'
        }
      ],
      weather: {
        temperature: '24',
        description: '晴朗',
        city: '北京'
      },
      showCitySelector: false,
      cityInput: '',
      popularCities: ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京', '西安'],
      timeUpdateInterval: null,
      weatherUpdateInterval: null
    };
  },
  computed: {
    weatherIcon() {
      const desc = this.weather.description.toLowerCase();
      if (desc.includes('晴')) return 'fas fa-sun';
      if (desc.includes('云')) return 'fas fa-cloud';
      if (desc.includes('雨')) return 'fas fa-cloud-rain';
      if (desc.includes('雪')) return 'fas fa-snowflake';
      return 'fas fa-cloud';
    }
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString('zh-CN');
      
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const weekday = weekdays[now.getDay()];
      
      this.currentDate = `${month}月${day}日 ${weekday}`;
    },
    toggleEngineDropdown() {
      this.showEngineDropdown = !this.showEngineDropdown;
    },
    selectEngine(engine) {
      this.currentEngine = engine;
      this.showEngineDropdown = false;
    },
    performSearch() {
      if (this.searchQuery.trim()) {
        const url = this.currentEngine.url + encodeURIComponent(this.searchQuery);
        window.open(url, '_blank');
      }
    },
    toggleDarkMode() {
      this.$emit('toggle-dark-mode');
    },
    getWeatherData(city = '北京') {
      // 模拟天气数据获取
      const weatherConditions = [
        { temperature: 24, description: '晴朗' },
        { temperature: 18, description: '多云' },
        { temperature: 15, description: '小雨' },
        { temperature: 22, description: '局部多云' }
      ];
      
      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      this.weather = {
        ...randomWeather,
        city: city
      };
      
      // 保存到本地存储
      localStorage.setItem('weatherCity', city);
    },
    selectCity(city) {
      this.cityInput = city;
    },
    confirmCity() {
      if (this.cityInput.trim()) {
        this.getWeatherData(this.cityInput.trim());
        this.showCitySelector = false;
        this.cityInput = '';
      }
    }
  },
  mounted() {
    // 初始化时间
    this.updateTime();
    
    // 设置时间更新定时器
    this.timeUpdateInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
    
    // 获取天气数据
    const savedCity = localStorage.getItem('weatherCity') || '北京';
    this.getWeatherData(savedCity);
    
    // 设置天气更新定时器
    this.weatherUpdateInterval = setInterval(() => {
      this.getWeatherData(this.weather.city);
    }, 300000); // 5分钟更新一次
  },
  beforeUnmount() {
    // 清除定时器
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }
    if (this.weatherUpdateInterval) {
      clearInterval(this.weatherUpdateInterval);
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.dark-mode .navbar {
  background-color: #2d3748;
  color: #e2e8f0;
}

.nav-brand {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #4f46e5;
}

.nav-brand i {
  margin-right: 8px;
  font-size: 1.4rem;
}

.nav-center {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 800px;
  margin: 0 20px;
}

.time-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 15px;
  padding: 5px 10px;
  background-color: #f8fafc;
  border-radius: 8px;
  min-width: 140px;
}

.dark-mode .time-display {
  background-color: #4a5568;
}

.current-time {
  font-size: 1.1rem;
  font-weight: 600;
}

.current-date {
  font-size: 0.8rem;
  color: #718096;
}

.search-container {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 500px;
  margin: 0 15px;
}

.search-engine-selector {
  position: relative;
  margin-right: 10px;
}

.engine-btn {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #f8fafc;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  min-width: 100px;
}

.dark-mode .engine-btn {
  background-color: #4a5568;
  color: #e2e8f0;
}

.engine-btn i {
  margin-right: 6px;
}

.engine-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 120px;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
}

.dark-mode .engine-dropdown {
  background-color: #4a5568;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.engine-option {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.engine-option:hover {
  background-color: #f1f5f9;
}

.dark-mode .engine-option:hover {
  background-color: #718096;
}

.engine-option i {
  margin-right: 8px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background-color: #f8fafc;
  margin-right: 10px;
}

.dark-mode .search-input {
  background-color: #4a5568;
  color: #e2e8f0;
}

.search-btn {
  padding: 8px 12px;
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #4338ca;
}

.weather-display {
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 5px 10px;
  background-color: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  min-width: 140px;
}

.dark-mode .weather-display {
  background-color: #4a5568;
}

.weather-icon {
  font-size: 1.4rem;
  margin-right: 8px;
  color: #f59e0b;
}

.weather-info {
  display: flex;
  flex-direction: column;
}

.temperature {
  font-size: 1rem;
  font-weight: 600;
}

.description {
  font-size: 0.8rem;
  color: #718096;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.nav-btn {
  padding: 8px;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
  color: #64748b;
}

.nav-btn:hover {
  background-color: #f1f5f9;
  color: #4f46e5;
}

.dark-mode .nav-btn:hover {
  background-color: #4a5568;
  color: #a5b4fc;
}

/* 城市选择器模态框样式 */
.city-selector-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  overflow: hidden;
}

.dark-mode .modal-content {
  background-color: #2d3748;
  color: #e2e8f0;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.dark-mode .modal-header {
  border-bottom-color: #4a5568;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
}

.modal-body {
  padding: 20px;
}

.city-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 15px;
}

.dark-mode .city-input {
  background-color: #4a5568;
  border-color: #4a5568;
  color: #e2e8f0;
}

.popular-cities {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.city-btn {
  padding: 8px;
  background-color: #f8fafc;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dark-mode .city-btn {
  background-color: #4a5568;
}

.city-btn:hover {
  background-color: #e2e8f0;
}

.dark-mode .city-btn:hover {
  background-color: #718096;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 15px 20px;
  border-top: 1px solid #e2e8f0;
}

.dark-mode .modal-footer {
  border-top-color: #4a5568;
}

.btn-cancel, .btn-confirm {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;
}

.btn-cancel {
  background-color: #f8fafc;
  color: #64748b;
}

.dark-mode .btn-cancel {
  background-color: #4a5568;
}

.btn-confirm {
  background-color: #4f46e5;
  color: white;
}

.btn-confirm:hover {
  background-color: #4338ca;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-center {
    flex-direction: column;
    margin: 10px 0;
  }
  
  .time-display, .weather-display {
    width: 100%;
    margin: 5px 0;
    justify-content: space-between;
  }
  
  .search-container {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
