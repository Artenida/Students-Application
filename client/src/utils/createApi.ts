type HttpMethods = "GET" | "POST" | "DELETE" | "PUT";

interface APIOptions {
  method?: HttpMethods;
  body?: string;
  token?: string;
}

export const createAPI = <FormBody>(endpoint: string, options: APIOptions) => {
  return async (body?: FormBody | FormData) => {
    const headers = {} as Record<string, string>;

    if (options.token) {
      headers['Authorization'] = `Bearer ${options.token}`;
    }

    let requestBody: any;
    if (body instanceof FormData) {
      requestBody = body;
    } else {
      headers['Content-Type'] = 'application/json';
      headers['Accept'] = 'application/json';
      requestBody = body ? JSON.stringify(body) : undefined;
    }

    return fetch(`http://localhost:5000/${endpoint}`, {
      method: options.method ?? 'GET',
      headers,
      body: requestBody,
    });
  };
};
