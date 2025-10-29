async function postData(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: data
  });

  // return await res.json();
  return res;
}

module.exports = postData;