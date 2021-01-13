interface RequestParams {
  [key: string]: string
}

export async function request (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  wsUrl: string,
  path: string,
  data?: RequestParams
) {
  let url = wsUrl.replace(/^wss:/, 'https:').replace(/^ws:/, 'http:') + path
  let body
  if (typeof data !== 'undefined') {
    body = JSON.stringify(data)
  }
  let response = await fetch(url, { method, body })
  if (response.status < 200 || response.status > 299) {
    throw new Error(`Response code ${response.status}`)
  }
}
