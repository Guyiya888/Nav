<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>关于 GUYI NAV</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* 关闭按钮样式 */
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
            background: rgba(243, 244, 246, 0.9);
            border: 1px solid rgba(209, 213, 219, 0.6);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
            cursor: pointer;
            z-index: 1000;
            transition: all 0.2s ease;
        }
        
        .close-btn:hover {
            background: rgba(229, 231, 235, 0.95);
            border-color: rgba(156, 163, 175, 0.8);
        }
        
        .close-btn i {
            color: #6b7280;
            font-size: 16px;
        }
        
        .close-btn:hover i {
            color: #ef4444;
        }
        
        /* 暗色模式 */
        .dark .close-btn {
            background: rgba(31, 41, 55, 0.9);
            border: 1px solid rgba(55, 65, 81, 0.6);
        }
        
        .dark .close-btn i {
            color: #9ca3af;
        }
        
        .dark .close-btn:hover {
            background: rgba(55, 65, 81, 0.95);
            border-color: rgba(75, 85, 99, 0.8);
        }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- 右上角关闭按钮 -->
    <div class="close-btn" onclick="window.location.href='/'">
        <i class="fas fa-times"></i>
    </div>
    
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
                    <div class="prose dark:prose-invert">
                        <!-- 页面内容保持不变 -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                                <i class="fas fa-rocket text-blue-500 text-xl mb-2"></i>
                                <h3 class="text-xl font-semibold mb-2">项目简介</h3>
                                <p class="text-gray-600 dark:text-gray-300">
                                    一个简洁的导航站点，导航数据从维基云表格获取。
                                </p>
                                <p> 
                                    <a href="https://vika.cn/share/shreDtmrPDnN87neZss2x/dstgUzq40yGM6H6Szn/viwq8iJ09CMn9" target="_blank" class="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 underline">
                                        维基云表格地址
                                    </a> |                   
                                    <a href="https://vika.cn/workbench/dstgUzq40yGM6H6Szn/viwq8iJ09CMn9" target="_blank" class="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 underline">
                                        网站收录申请
                                    </a>
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
                        
                        <!-- 其他内容保持不变 -->
                    </div>
                </div>
                
                <!-- 底部区域 -->
                <div class="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <p>© 2025 GUYI NAV. 保留所有权利。</p>
                </div>
            </main>
        </div>
    </div>

    <script>
        // 暗色模式切换
        if (localStorage.getItem('darkMode') === 'true') {
            document.documentElement.classList.add('dark');
        }
    </script>
</body>
</html>
