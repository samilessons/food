export default async function getData(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.log(`Не удалось получить ${url}, статус - ${res.status}`);
    }

    return await res.json();
  } catch (e) {
    console.log(e);
  }
}