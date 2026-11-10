// Simple Node.js script to test the Gemini API key
// Run with: node test-api-key.js

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Set GEMINI_API_KEY (or VITE_GEMINI_API_KEY) before running this script.");
  process.exit(1);
}

async function testApiKey() {
  console.log('Testing Gemini API key:', API_KEY);
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "What is 2+2?"
            }]
          }]
        })
      }
    );
    
    const data = await response.json();
    console.log('Response status:', response.status);
    
    if (response.ok) {
      console.log('✅ API Key is valid!');
      console.log('Response:', data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response text');
    } else {
      console.log('❌ API Error:');
      console.log('Status:', response.status);
      console.log('Error:', data.error?.message || 'Unknown error');
    }
  } catch (error) {
    console.log('❌ Network Error:');
    console.log(error.message);
  }
}

testApiKey();