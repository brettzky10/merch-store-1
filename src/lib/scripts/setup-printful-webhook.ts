import fetch from 'node-fetch';

interface WebhookSetupResponse {
  code: number;
  result: {
    id: number;
    url: string;
    types: string[];
  };
}

function isWebhookSetupResponse(data: any): data is WebhookSetupResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.code === 'number' &&
    typeof data.result === 'object' &&
    typeof data.result.id === 'number' &&
    typeof data.result.url === 'string' &&
    Array.isArray(data.result.types) &&
    data.result.types.every((type: any) => typeof type === 'string')
  );
}

async function setupPrintfulWebhook(apiKey: string, storeId: string): Promise<WebhookSetupResponse> {
  const url = 'https://api.printful.com/webhook';
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'X-PF-Store-Id': storeId
  };

  const body = JSON.stringify({
    url: "https://www.example.com/printful/webhook",
    types: [
      "package_shipped",
      "order_updated"
    ]
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!isWebhookSetupResponse(data)) {
      throw new Error('Invalid response format from Printful API');
    }

    console.log('Webhook setup successful:', data);
    return data;
  } catch (error) {
    console.error('Error setting up Printful webhook:', error);
    throw error;
  }
}

// Usage example
const API_KEY = process.env.NEXT_PUBLIC_PRINTFUL_API_KEY!;
const STORE_ID = process.env.PRINTFUL_STORE_ID!;

setupPrintfulWebhook(API_KEY, STORE_ID)
  .then(response => {
    console.log('Webhook ID:', response.result.id);
    console.log('Webhook URL:', response.result.url);
    console.log('Webhook Types:', response.result.types.join(', '));
  })
  .catch(error => {
    console.error('Failed to set up webhook:', error);
  });