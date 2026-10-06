import Constants from "expo-constants";

/**
 * Базовый URL API.
 *
 * Логика:
 * - На iOS-симуляторе и Android-эмуляторе localhost работает по-разному.
 * - На реальном устройстве localhost указывает на само устройство, а не на компьютер.
 * - Для разработки используем IP компьютера в локальной сети.
 */
function getApiUrl(): string {
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0];

  if (!localhost) {
    // Фолбэк для продакшена
    return "https://your-production-server.com/api";
  }

  return `http://${localhost}:3000/api`;
}

export const API_URL = getApiUrl();
