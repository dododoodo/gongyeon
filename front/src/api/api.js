export const publicData = async ({ numOfRows = 100, pageNo = 1 } = {}) => {
  try {
    const response = await fetch('/data.json'); 
    if (!response.ok) {
      throw new Error('데이터를 가져오는 데 실패했습니다.');
    }
    const data = await response.json();

    let items = data?.response?.body?.items?.item || [];
    const allItems = Array.isArray(items) ? items : [items];

    return { response: { body: { items: { item: allItems } } } };
  } catch (error) {
    console.error("데이터 요청 오류:", error);
    throw error;
  }
};
