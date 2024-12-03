export const downloadFile = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    // Set `onerror` handler
    xhr.onerror = (e) => reject('Error loading file'); // Reject if error occurs

    // Set `onload` handler
    xhr.onload = (e) => {
      if (xhr.status === 200) {
        const jsonString = xhr.responseText;
        resolve(jsonString); // Resolve the promise with the downloaded data
      } else {
        reject(`Failed to load file: ${xhr.status}`); // Reject if the response is not OK
      }
    };

    // Open the connection and send the request
    xhr.open('GET', url);
    xhr.send();
  });
};
