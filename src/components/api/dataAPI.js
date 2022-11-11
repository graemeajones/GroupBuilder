export async function dataRequest(endpoint, method = "GET", body = null) {

  // Build fetch parameters
  let requestObj = { method: method }; // *GET, POST, PUT, DELETE, etc.
  if (body) requestObj = { ...requestObj, body };

  // Define endpoint address
  const API_URL = 'http://localhost:5000/api/';
  const address = API_URL + endpoint;

  // Call API and return response object
  const response = await fetch(address, requestObj);
  if ((response.status >= 200) && (response.status <= 299))
       return { success: true, response: await response.json() };
  else return { success: false, response: response }
}
