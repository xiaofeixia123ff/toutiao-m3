/* 本地存储操作模块 */

/* 存储数据 */
export const setItem = (key, value) => {
  // 将数组、对象的数据转换为JSON字符串格式
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/* 获取数据 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/* 删除数据 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
