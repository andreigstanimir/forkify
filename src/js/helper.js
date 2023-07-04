import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = '') {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPromise]);

    if (!res.ok) throw new Error(`Invalid id (${res.status})`);

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([timeout(TIMEOUT_SEC), fetch(url)]);

//     if (!res.ok) throw new Error(`Invalid id (${res.status})`);

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const res = await Promise.race([
//       timeout(TIMEOUT_SEC),
//       fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(uploadData),
//       }),
//     ]);

//     if (!res.ok) throw new Error(`Invalid id (${res.status})`);

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
