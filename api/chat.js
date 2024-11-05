const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  const apiUrl = 'https://api.openai.com/v1/completions';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.7
      })
    });

    // Log the response text for debugging if not successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API Error Response:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    const chatResponse = data.choices[0].text.trim();
    res.status(200).json({ response: chatResponse });
  } catch (error) {
    console.error("Error in API request:", error); // Log detailed error
    res.status(500).json({ error: error.toString() });
  }
};
