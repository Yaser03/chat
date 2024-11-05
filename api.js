document.getElementById('submit-btn').addEventListener('click', async () => {
  // Get user input
  const prompt = document.getElementById('prompt').value;

  // Show loading message
  document.getElementById('response').innerText = 'Loading...';

  try {
    // Make API request to backend
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    // Parse the response
    const data = await response.json();
    document.getElementById('response').innerText = data.response; // Display GPT response

  } catch (error) {
    // Display error message if request fails
    document.getElementById('response').innerText = 'Error: ' + error.message;
  }
});

