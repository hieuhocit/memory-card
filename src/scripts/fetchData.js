export default async function fetchData(url, setProgress) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Get the total length of the response content from headers (if available)
    const contentLength = response.headers.get('Content-Length');

    if (!contentLength) {
      console.error('Content-Length not specified in the response headers.');
      return;
    }

    const total = parseInt(contentLength, 10); // Convert to integer
    const reader = response.body.getReader();
    let receivedLength = 0; // Number of bytes received so far
    const chunks = []; // Array to accumulate chunks

    await waitAMinute(1000);
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;

      // Update the progress bar value
      setProgress((receivedLength / total) * 100);
    }

    // Concatenate all chunks into a single Uint8Array
    const chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (let chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }

    // Decode the result as a string
    const resultString = new TextDecoder('utf-8').decode(chunksAll);

    // Parse the JSON string into an object
    let resultJson;
    try {
      resultJson = JSON.parse(resultString);
    } catch (err) {
      console.error('Error parsing JSON:', err);
      throw err; // Re-throw the error after logging it
    }

    // console.log('Download complete. Total size:', receivedLength, 'bytes');
    // console.log('Received JSON:', resultJson);
    await waitAMinute(1000);
    return resultJson.items;
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

function waitAMinute(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Done');
    }, delay);
  });
}
