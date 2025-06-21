import { loadingService } from "./LoadingService";

export async function fetchWithLoader<T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  loadingService.start();
  try {
    const res = await fetch(input, init);
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    return data;
  } finally {
    loadingService.stop();
  }
}
