document.getElementById('submit-btn').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value;
  document.getElementById('response').innerText = 'Loading...';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    document.getElementById('response').innerText = data.response;
  } catch (error) {
    document.getElementById('response').innerText = 'Error: ' + error.message;
  }
});
