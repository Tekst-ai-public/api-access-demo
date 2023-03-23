interface FetchResponse<T> extends Response {
  json: () => Promise<T>
}

export async function apiFetch<T = any>(path: string, init: RequestInit | undefined = {}): Promise<FetchResponse<T>> {
  init.headers = {
    'Content-Type': 'application/json',
    ...init.headers,
  }
  const url = new URL(process.env.REACT_APP_SERVER_BASE_URL + path)
  const res: Promise<FetchResponse<T>> = fetch(`${url.toString()}`, {
    ...init,
  })
  return res
}