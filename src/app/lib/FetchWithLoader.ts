import { loadingService } from './LoadingService';

export async function fetchWithLoader<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  loadingService.start();

  try {
    const res = await fetch(input, init);

    if (!res.ok) {
      const text = await res.text(); // helpful to log full error body
      throw new Error(`Fetch error ${res.status}: ${text}`);
    }

    const data = await res.json();
    return data as T;
  } catch (error) {
    console.error('[fetchWithLoader] error:', error);
    throw error;
  } finally {
    loadingService.stop();
  }
}
