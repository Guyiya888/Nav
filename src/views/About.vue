<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>关于 GUYI NAV</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* 右上角关闭按钮样式 */
        .close-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 36px;
            height: 36px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            z-index: 1000;
            transition: all 0.2s ease;
        }
        
        .close-btn:hover {
            background: rgba(255, 255, 255, 1);
            border-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .close-btn:hover i {
            color: #ef4444;
        }
        
        .close-btn i {
            color: rgba(0, 0, 0, 0.6);
            font-size: 18px;
            transition: color 0.2s ease;
        }
        
        /* 暗色模式适配 */
        .dark .close-btn {
            background: rgba(30, 30, 30, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .dark .close-btn:hover {
            background: rgba(40, 40, 40, 1);
            border-color: rgba(255, 255, 255, 0.2);
        }
        
        .dark .close-btn i {
            color: rgba(255, 255, 255, 0.7);
        }
        
        .dark .close-btn:hover i {
            color: #f87171;
        }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <!-- 右上角关闭按钮 -->
    <div class="close-btn" onclick="window.location.href='/'" title="返回主页">
        <i class="fas fa-times"></i>
    </div>
    
    <!-- 原有页面内容保持不变 -->
    <div class="h-screen flex flex-col">
        <div class="flex flex-1 overflow-hidden relative">
            <main class="flex-1 flex flex-col p-4 overflow-y-auto">
                <div class="flex-grow max-w-5xl mx-auto w-full">
                    <h1 
                        class="text-3xl font-bold mb-6 text-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors cursor-pointer"
                        onclick="window.location.href='/'"
                    >
                        关于 GUYI NAV
                    </h1>
                    
                    <!-- 页面其余内容保持不变 -->
                    <div class="prose dark:prose-invert">
                        <!-- 项目简介 -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                                <i class="fas fa-rocket text-blue-500 text-xl mb-2"></i>
                                <h3 class="text-xl font-semibold mb-2">项目简介</h3>
                                <p class="text-gray-600 dark:text-gray-300">
                                    一个简洁的导航站点，导航数据从维基云表格获取。
                                </p>
                                <p> 
                                    <a href="https://vika.cn/share/shreDtmrPDnN87neZss2x/dstgUzq40yGM6H6Szn/viwq8iJ09CMn9" target="_blank" class="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 underline">维基云表格地址</a> |                   
                                    <a href="https://vika.cn/workbench/dstgUzq40yGM6H6Szn/viwq8iJ09CMn9" target="_blank" class="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 underline">网站收录申请</a>
                                </p>
                            </div>
                            
                            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                                <i class="fas fa-code text-purple-500 text-xl mb-2"></i>
                                <h3 class="text-xl font-semibold mb-2">技术栈</h3>
                                <ul class="list-disc pl-4 text-gray-600 dark:text-gray-300">
                                    <li>Vue 3 + Composition API</li>
                                    <li>Tailwind CSS</li>
                                    <li>Vue Router</li>
                                    <li>Font Awesome</li>
                                </ul>
                            </div>
                        </div>
                        
                        <!-- 功能特点 -->
                        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                            <i class="fas fa-star text-yellow-500 text-xl mb-2"></i>
                            <h3 class="text-xl font-semibold mb-2">功能特点</h3>
                            <ul class="list-disc pl-4 text-gray-600 dark:text-gray-300">
                                <li>智能本地搜索功能</li>
                                <li>全AI智能开发部署</li>
                                <li>响应式侧边栏布局</li>
                                <li>黑暗模式自动适配</li>                  
                                <li>多分类资源管理</li>
                                <li>从维基云表格获取数据，无需数据库</li>
                            </ul>
                        </div>
                        
                        <!-- 关于作者 -->
                        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                            <i class="fas fa-user-circle text-red-500 text-xl mb-2"></i>
                            <h3 class="text-xl font-semibold mb-2">关于作者</h3>
                            <div class="text-gray-600 dark:text-gray-300 space-y-2">
                                <p>🕴 开发：</p>
                                <p>🚀1</p>
                                <p>🏠 个人主页： <a href="#" target="_blank" class="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 underline">GUYI@</a></p>
                                <p>🌐 个人博客： <a href="#" target="_blank" class="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 underline">博客</a></p>
                                <p>💰 另一网页： <a href="https://baidu.com" target="_blank" class="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 underline">打赏页面</a></p>
                            </div>
                        </div>
                        
                        <!-- 数据统计 -->
                        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                            <i class="fas fa-chart-line text-green-500 text-xl mb-2"></i>
                            <h3 class="text-xl font-semibold mb-2">数据统计</h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div>
                                    <div class="text-2xl font-bold text-blue-500">50个</div>
                                    <div class="text-sm text-gray-500">收录网站</div>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold text-purple-500">100%</div>
                                    <div class="text-sm text-gray-500">可用性监测</div>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold text-green-500">2025-10-15</div>
                                    <div class="text-sm text-gray-500">手动更新</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 底部区域 -->
                <div class="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <p>© 2025 GUYI NAV. 保留所有权利。</p>
                </div>
            </main>
        </div>
    </div>

    <!-- 暗色模式切换按钮 -->
    <button id="darkModeToggle" class="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300">
        <i class="fas fa-moon dark:hidden"></i>
        <i class="fas fa-sun hidden dark:block"></i>
    </button>

    <script>
        // 暗色模式切换功能
        document.getElementById('darkModeToggle').addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
        });

        // 初始化暗色模式
        if (localStorage.getItem('darkMode') === 'true') {
            document.documentElement.classList.add('dark');
        }
    </script>
</body>
</html>

