function buildParams(data) {
  const params = new URLSearchParams()

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(value => params.append(key, value.toString()))
    } else {
      params.append(key, value.toString())
    }
  });

  return params.toString()
}

async function axiosAdapter(requestConfig, interceptors){
  let timeout = 5000
  if (requestConfig.timeout && typeof requestConfig.timeout !== 'number') {
    try {
      timeout = parseInt(requestConfig.timeout);
    } catch (e) {
      console.warn(`Timeout set for request to: ${requestConfig.baseURL} is invalid. Got ${requestConfig.timeout}. Using default timeout: ${timeout}`);
    }
  }
  if(interceptors.request.handlers.length > 0){
    for(const interceptor of interceptors.request.handlers){
      requestConfig = await interceptor(requestConfig);
    }
  }
  let url = requestConfig.baseURL
  if(requestConfig.params){
    url += (url.includes('?') ? '&' : '?') + buildParams(requestConfig.params)
  }


  let res = await fetch(url, {
    method: requestConfig.method,
    signal: requestConfig.timeout && AbortSignal.timeout(requestConfig.timeout),
    headers: requestConfig.headers,
    body: requestConfig.data,
    mode: 'cors'
  })

  if(interceptors.response.handlers.length > 0){
    for(const interceptor of interceptors.response.handlers){
      res = await interceptor(res);
    }
  }
  if(typeof requestConfig.validateStatus === 'function'){
    if(!requestConfig.validateStatus(res.status)){
      throw new Error(`Request to ${requestConfig.url} failed with status code ${res.status}`);
    }
  }
  if(res.headers.get('content-type') === 'application/json'){
    res.data = await res.json();
  } else if(res.headers.get('content-type').includes('text/')) {
    res.data = await res.text();
  } else {
    res.data = await res.blob();
  }
  return res;
}

class InterceptorContainer {
  constructor () {
    this.handlers = [];
  }
  use(handler) {
    this.handlers.push(handler);
  }
}

// Create a minimal adapter that provides some of the functionality that axios provides, such as interceptors
module.exports = {
  buildParams,
  newAxiosAdapter () {
    const interceptors = {request: new InterceptorContainer(), response: new InterceptorContainer()}
    const adapter = (requestConfig)=> axiosAdapter(requestConfig, interceptors);
    adapter.interceptors = interceptors;
    return adapter
  }
}