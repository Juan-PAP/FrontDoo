
type HttpResponse<Response> = {
  success?: Response
  error?: string
}

const BASE_URL = "http://localhost:8080"

// GET
export async function getRequest<Response>(
  endpoint: string
): Promise<HttpResponse<Response>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
    })

    if (response.status !== 200) {
      return { error: `Error: ${response.status} - ${response.statusText}` }
    }

    const data = (await response.json()) as Response
    return { success: data }
  } catch (error) {
    return { error: `Error: ${String(error)}` }
  }
}

// POST
export async function postRequest<Response>(
  endpoint: string,
  body: Record<string, unknown>
): Promise<HttpResponse<Response>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (![200, 201, 204].includes(response.status)) {
      return { error: `Error: ${response.status} - ${response.statusText}` }
    }

    // algunos POST devuelven body vacío (204)
    const data = response.status !== 204 ? await response.json() : null
    return { success: data as Response }
  } catch (error) {
    return { error: `Error: ${String(error)}` }
  }
}