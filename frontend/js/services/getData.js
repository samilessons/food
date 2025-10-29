async function getData(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Не удалось получить ${url}, статус - ${res.status}`);
  }

  return await res.json();
}

module.exports = getData;