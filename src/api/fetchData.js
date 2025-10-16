const apiKey = 'uskB1TX7HZDDLcR5WmYCQUU';
const datasheetId = 'dstgUzq40yGM6H6Szn';
const baseUrl = 'https://api.vika.cn/fusion/v1/datasheets';
const viewId = 'viwq8iJ09CMn9';
const fieldKey = 'name';
const apiUrl = `${baseUrl}/${datasheetId}/records?viewId=${viewId}&fieldKey=${fieldKey}&pageSize=1000`;
const DEFAULT_ICON_URL = '/default.ico';

export async function fetchData() {
  try {
    const response = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API请求失败:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error('API请求失败');
    }
    
    const responseData = await response.json();
    console.log('API返回数据:', responseData);
    
    if (!responseData || !responseData.data || !responseData.data.records || !Array.isArray(responseData.data.records)) {
      throw new Error(`返回数据格式不正确: ${JSON.stringify(responseData)}`);
    }
    
    return responseData.data.records.map(record => {
      if (!record.fields || !record.fields.category || !record.fields.name) {
        console.warn('缺少必填字段的记录:', record);
        return null;
      }
      return {
        id: record.recordId,
        category: record.fields.category,
        name: record.fields.name,
        url: record.fields.url,
        description: record.fields.description || '',
        icon: record.fields.icon || DEFAULT_ICON_URL,
        sortOrder: record.fields.order ? parseInt(record.fields.order) : 0,
      };
    }).filter(Boolean).sort((a, b) => b.sortOrder - a.sortOrder);  // 修改排序逻辑为降序
  } catch (error) {
    console.error('数据获取失败:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    return [];
  }
}
