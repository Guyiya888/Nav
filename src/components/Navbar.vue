<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GUYI导航站 - 完整天气功能</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', system-ui, sans-serif;
        }
        
        body {
            background-color: #f5f7fa;
            color: #2d3748;
            transition: background-color 0.3s, color 0.3s;
        }
        
        body.dark {
            background-color: #1a202c;
            color: #e2e8f0;
        }
        
        .nav-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            padding: 15px 20px;
            margin: 20px auto;
            max-width: 1200px;
            transition: all 0.3s;
        }
        
        .dark .nav-container {
            background: #2d3748;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .nav-brand {
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            font-weight: 700;
            color: #4f46e5;
            text-decoration: none;
        }
        
        .nav-brand i {
            margin-right: 10px;
            font-size: 1.8rem;
        }
        
        .nav-center {
            display: flex;
            align-items: center;
            flex: 1;
            max-width: 800px;
            margin: 0 30px;
        }
        
        .time-display {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px 15px;
            background: #f7fafc;
            border-radius: 8px;
            margin-right: 15px;
            min-width: 140px;
            transition: all 0.3s;
        }
        
        .dark .time-display {
            background: #4a5568;
        }
        
        .time {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2d3748;
        }
        
        .dark .time {
            color: #e2e8f0;
        }
        
        .date {
            font-size: 0.85rem;
            color: #718096;
        }
        
        .weather-display {
            display: flex;
            align-items: center;
            padding: 8px 15px;
            background: #f7fafc;
            border-radius: 8px;
            min-width: 140px;
            transition: all 0.3s;
            cursor: pointer;
        }
        
        .dark .weather-display {
            background: #4a5568;
        }
        
        .weather-icon {
            font-size: 1.8rem;
            margin-right: 10px;
        }
        
        .weather-info {
            display: flex;
            flex-direction: column;
        }
        
        .weather-temp {
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .weather-desc {
            font-size: 0.85rem;
            color: #718096;
        }
        
        .search-area {
            display: flex;
            align-items: center;
            flex: 1;
            max-width: 500px;
            margin: 0 15px;
        }
        
        .engine-selector {
            position: relative;
            margin-right: 10px;
        }
        
        .engine-btn {
            display: flex;
            align-items: center;
            background: #f7fafc;
            border: none;
            border-radius: 8px;
            padding: 10px 15px;
            cursor: pointer;
            min-width: 120px;
            transition: all 0.3s;
        }
        
        .dark .engine-btn {
            background: #4a5568;
            color: #e2e8f0;
        }
        
        .engine-btn i {
            margin-right: 8px;
            width: 16px;
            text-align: center;
        }
        
        .engine-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            width: 160px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            z-index: 100;
            overflow: hidden;
        }
        
        .dark .engine-dropdown {
            background: #2d3748;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .engine-option {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            cursor: pointer;
            transition: background 0.2s;
        }
        
        .engine-option:hover {
            background: #f7fafc;
        }
        
        .dark .engine-option:hover {
            background: #4a5568;
        }
        
        .engine-option i {
            margin-right: 10px;
            width: 16px;
            text-align: center;
        }
        
        .search-input {
            flex: 1;
            background: #f7fafc;
            border: none;
            border-radius: 8px;
            padding: 10px 15px;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        .dark .search-input {
            background: #4a5568;
            color: #e2e8f0;
        }
        
        .search-input:focus {
            outline: none;
            box-shadow: 0 0 0 2px #a5b4fc;
        }
        
        .search-btn {
            background: #4f46e5;
            border: none;
            border-radius: 8px;
            color: white;
            padding: 10px 15px;
            margin-left: 10px;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .search-btn:hover {
            background: #4338ca;
        }
        
        .nav-actions {
            display: flex;
            align-items: center;
        }
        
        .nav-btn {
            background: none;
            border: none;
            font-size: 1.2rem;
            color: #718096;
            padding: 8px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s;
            margin-left: 5px;
        }
        
        .nav-btn:hover {
            background: #f7fafc;
            color: #4f46e5;
        }
        
        .dark .nav-btn:hover {
            background: #4a5568;
        }
        
        /* 城市选择弹窗 */
        .city-selector-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .city-selector-content {
            background: white;
            border-radius: 12px;
            padding: 20px;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        
        .dark .city-selector-content {
            background: #2d3748;
        }
        
        .city-selector-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .city-selector-title {
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .city-selector-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #718096;
        }
        
        .city-input {
            width: 100%;
            padding: 10px 15px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 1rem;
        }
        
        .dark .city-input {
            background: #4a5568;
            border-color: #4a5568;
            color: #e2e8f0;
        }
        
        .popular-cities {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .city-btn {
            padding: 10px;
            background: #f7fafc;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
        }
        
        .dark .city-btn {
            background: #4a5568;
            color: #e2e8f0;
        }
        
        .city-btn:hover {
            background: #edf2f7;
        }
        
        .dark .city-btn:hover {
            background: #4a5568;
        }
        
        .city-selector-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        
        .action-btn {
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .cancel-btn {
            background: #f7fafc;
            color: #4a5568;
        }
        
        .dark .cancel-btn {
            background: #4a5568;
            color: #e2e8f0;
        }
        
        .confirm-btn {
            background: #4f46e5;
            color: white;
        }
        
        .confirm-btn:hover {
            background: #4338ca;
        }
        
        @media (max-width: 968px) {
            .nav-center {
                flex-direction: column;
                margin: 10px 0;
            }
            
            .time-display, .weather-display {
                width: 100%;
                justify-content: space-between;
                margin-bottom: 15px;
            }
            
            .search-area {
                width: 100%;
                max-width: 100%;
                margin: 0;
            }
        }
        
        @media (max-width: 768px) {
            nav {
                flex-wrap: wrap;
            }
            
            .nav-brand {
                margin-bottom: 10px;
            }
            
            .nav-actions {
                margin-left: auto;
            }
            
            .time-display, .weather-display {
                order: 3;
                width: 100%;
                margin-top: 15px;
            }
            
            .popular-cities {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <div id="app">
        <div class="nav-container">
            <nav>
                <a href="#" class="nav-brand">
                    <i class="fas fa-atom"></i> GUYI导航站
                </a>
                
                <div class="nav-center">
                    <!-- 左侧时间显示 -->
                    <div class="time-display">
                        <div class="time">{{ currentTime }}</div>
                        <div class="date">{{ currentDate }}</div>
                    </div>
                    
                    <!-- 搜索区域 -->
                    <div class="search-area">
                        <div class="engine-selector">
                            <button class="engine-btn" @click="showEngines = !showEngines">
                                <i :class="engineIcons[selectedEngine]"></i>
                                <span>{{ engines[selectedEngine].name }}</span>
                            </button>
                            
                            <div class="engine-dropdown" v-show="showEngines">
                                <div class="engine-option" v-for="(engine, key) in engines" 
                                     @click="selectEngine(key)">
                                    <i :class="engineIcons[key]"></i>
                                    <span>{{ engine.name }}</span>
                                </div>
                            </div>
                        </div>
                        
                        <input type="text" class="search-input" v-model="searchQuery" 
                               :placeholder="engines[selectedEngine].placeholder">
                        
                        <button class="search-btn" @click="search">
                            <i class="fas fa-search"></i> 搜索
                        </button>
                    </div>
                    
                    <!-- 右侧天气显示 -->
                    <div class="weather-display" @click="showCitySelector = true">
                        <i class="fas weather-icon" :class="weatherIcon"></i>
                        <div class="weather-info">
                            <div class="weather-temp">{{ weather.temp }}°C</div>
                            <div class="weather-desc">{{ weather.city }}·{{ weather.desc }}</div>
                        </div>
                    </div>
                </div>
                
                <div class="nav-actions">
                    <button class="nav-btn">
                        <i class="fas fa-cog"></i>
                    </button>
                    <button class="nav-btn">
                        <i class="fab fa-github"></i>
                    </button>
                    <button class="nav-btn" @click="toggleDarkMode">
                        <i class="fas" :class="darkMode ? 'fa-sun' : 'fa-moon'"></i>
                    </button>
                </div>
            </nav>
        </div>

        <!-- 城市选择弹窗 -->
        <div class="city-selector-modal" v-if="showCitySelector">
            <div class="city-selector-content">
                <div class="city-selector-header">
                    <h3 class="city-selector-title">选择城市</h3>
                    <button class="city-selector-close" @click="showCitySelector = false">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <input type="text" class="city-input" v-model="cityInput" placeholder="输入城市名称">
                
                <div class="popular-cities">
                    <button class="city-btn" v-for="city in popularCities" :key="city" @click="selectCity(city)">
                        {{ city }}
                    </button>
                </div>
                
                <div class="city-selector-actions">
                    <button class="action-btn cancel-btn" @click="showCitySelector = false">取消</button>
                    <button class="action-btn confirm-btn" @click="changeCity">确定</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        new Vue({
            el: '#app',
            data: {
                darkMode: false,
                currentTime: '00:00:00',
                currentDate: '1月1日 星期一',
                searchQuery: '',
                showEngines: false,
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
                    }
                },
                engineIcons: {
                    bing: 'fab fa-microsoft',
                    baidu: 'fas fa-paw',
                    google: 'fab fa-google'
                },
                weather: {
                    temp: '--',
                    desc: '加载中...',
                    city: '北京'
                },
                showCitySelector: false,
                cityInput: '',
                popularCities: ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '南京', '西安'],
                timeTimer: null,
                weatherTimer: null
            },
            computed: {
                weatherIcon() {
                    const desc = this.weather.desc;
                    if (!desc) return 'fa-cloud text-gray-400';
                    
                    if (desc.includes('晴')) return 'fa-sun text-yellow-500';
                    if (desc.includes('云')) return 'fa-cloud text-gray-400';
                    if (desc.includes('雨')) return 'fa-cloud-rain text-blue-400';
                    if (desc.includes('雪')) return 'fa-snowflake text-blue-200';
                    if (desc.includes('雾') || desc.includes('霾')) return 'fa-smog text-gray-400';
                    return 'fa-cloud text-gray-400';
                }
            },
            methods: {
                search() {
                    if (this.searchQuery.trim()) {
                        const url = this.engines[this.selectedEngine].url + encodeURIComponent(this.searchQuery);
                        window.open(url, '_blank');
                    }
                },
                selectEngine(key) {
                    this.selectedEngine = key;
                    this.showEngines = false;
                },
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
                toggleDarkMode() {
                    this.darkMode = !this.darkMode;
                    document.body.classList.toggle('dark', this.darkMode);
                },
                // 获取天气数据
                async getWeatherData(city = '北京') {
                    try {
                        // 使用和风天气API（需要替换为您的API密钥）
                        // 注册地址：https://dev.qweather.com/
                        const API_KEY = 'b3ac86e464ba40f58fdee7f3eaa8ea13'; // 请替换为您的API密钥
                        
                        // 首先获取城市ID
                        const cityResponse = await fetch(`https://geoapi.qweather.com/v2/city/lookup?key=${API_KEY}&location=${city}`);
                        const cityData = await cityResponse.json();
                        
                        if (cityData.code === '200' && cityData.location.length > 0) {
                            const locationId = cityData.location[0].id;
                            
                            // 获取天气数据
                            const weatherResponse = await fetch(`https://devapi.qweather.com/v7/weather/now?key=${b3ac86e464ba40f58fdee7f3eaa8ea13}&location=${locationId}`);
                            const weatherData = await weatherResponse.json();
                            
                            if (weatherData.code === '200') {
                                this.weather = {
                                    temp: weatherData.now.temp,
                                    desc: weatherData.now.text,
                                    city: cityData.location[0].name
                                };
                                
                                // 保存到本地存储
                                localStorage.setItem('weatherCity', city);
                            } else {
                                throw new Error('天气数据获取失败');
                            }
                        } else {
                            throw new Error('城市数据获取失败');
                        }
                    } catch (error) {
                        console.error('获取天气数据失败:', error);
                        // 使用模拟数据作为备用
                        this.useMockWeatherData(city);
                    }
                },
                // 使用模拟天气数据
                useMockWeatherData(city) {
                    const cityTemps = {
                        '北京': { min: 15, max: 25 },
                        '上海': { min: 18, max: 28 },
                        '广州': { min: 20, max: 30 },
                        '深圳': { min: 22, max: 32 },
                        '杭州': { min: 16, max: 26 },
                        '成都': { min: 14, max: 24 },
                        '武汉': { min: 17, max: 27 },
                        '南京': { min: 16, max: 26 },
                        '西安': { min: 13, max: 23 }
                    };
                    
                    const conditions = ['晴朗', '多云', '局部多云', '小雨', '阴天'];
                    
                    const cityTemp = cityTemps[city] || { min: 15, max: 25 };
                    const temp = Math.floor(Math.random() * (cityTemp.max - cityTemp.min + 1)) + cityTemp.min;
                    const desc = conditions[Math.floor(Math.random() * conditions.length)];
                    
                    this.weather = {
                        temp: temp,
                        desc: desc,
                        city: city
                    };
                },
                // 选择热门城市
                selectCity(city) {
                    this.cityInput = city;
                    this.changeCity();
                },
                // 更改城市
                changeCity() {
                    if (this.cityInput.trim()) {
                        this.getWeatherData(this.cityInput.trim());
                        this.showCitySelector = false;
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
                
                // 从本地存储获取城市或使用默认城市
                const savedCity = localStorage.getItem('weatherCity') || '北京';
                this.getWeatherData(savedCity);
                
                // 设置定时器，每30分钟更新一次天气
                this.weatherTimer = setInterval(() => {
                    const currentCity = this.weather.city || '北京';
                    this.getWeatherData(currentCity);
                }, 1800000); // 30分钟
            },
            beforeDestroy() {
                // 清除定时器
                if (this.timeTimer) clearInterval(this.timeTimer);
                if (this.weatherTimer) clearInterval(this.weatherTimer);
            }
        });
    </script>
</body>
</html>
