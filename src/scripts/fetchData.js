export default async function fetchData(url, setProgress) {
  let progress = 0;

  try {
    const response = await fetch(url);

    progress = increaseProgress(progress);
    setProgress((prev) => Math.max(prev, progress));
    await waitRandom(500, 1000);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    progress = increaseProgress(progress);
    setProgress(prev => Math.max(prev, progress));
    await waitRandom(500, 1200);

    const data = await response.json();

    progress = increaseProgress(progress);
    setProgress(prev => Math.max(prev, progress));
    await waitRandom(400, 800);

    setProgress(100);
    await waitRandom(200, 300);

    return data?.items || [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

function increaseProgress(current) {
  const increment = Math.floor(Math.random() * 20) + 10;
  return Math.min(current + increment, 90);
}

function waitRandom(min, max) {
  const delay = Math.floor(Math.random() * (max - min)) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
}
