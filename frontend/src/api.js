const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const localBaseUrls = [
  'http://127.0.0.1:8000',
  'http://127.0.0.1:8001',
  'http://127.0.0.1:8002',
];
const baseUrlCandidates = configuredBaseUrl
  ? [configuredBaseUrl, ...localBaseUrls]
  : [...localBaseUrls, ''];
const fallbackBaseUrls = [...new Set(baseUrlCandidates.filter((value) => value !== undefined && value !== null))];

export function buildApiUrl(path, baseUrl = fallbackBaseUrls[0]) {
  return `${baseUrl}${path}`;
}

export async function apiFetch(path, options = {}) {
  let lastError;

  for (const baseUrl of fallbackBaseUrls) {
    try {
      const response = await fetch(buildApiUrl(path, baseUrl), options);

      // If dev proxy is not configured, local frontend may return 404 for /api/*.
      if (baseUrl === '' && response.status === 404 && !configuredBaseUrl) {
        continue;
      }
      // If dev proxy is configured to a dead backend port, Vite returns 5xx.
      // Try direct local backend ports before failing the submission.
      if (baseUrl === '' && response.status >= 500 && !configuredBaseUrl) {
        continue;
      }

      return response;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error('API is unreachable');
}
