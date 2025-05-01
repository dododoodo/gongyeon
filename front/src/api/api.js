export const publicData = async () => {
  try {
    const response = await fetch('/data.json'); 
    if (!response.ok) {
      throw new Error('데이터를 가져오는 데 실패했습니다.');
    }
    const data = await response.json();

    const items = data?.response?.body?.items?.item || [];

    return items;
  } catch (error) {
    console.error("데이터 요청 오류:", error);
    throw error;
  }
};
