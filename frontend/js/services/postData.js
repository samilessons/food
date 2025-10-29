export default async function postData(url, data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: data
    });
  
    // return await res.json();
    return res;
  } catch (e) {
    console.log(e);
  }
}