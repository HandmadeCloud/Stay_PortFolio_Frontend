export async function fetchRequest<T>(
    url: string,
    options: RequestInit
  ): Promise<T> {
    const response = await fetch(url, options);
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API 요청 실패');
    }
  
    return response.json();
  }