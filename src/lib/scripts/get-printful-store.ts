import fetch from 'node-fetch';

interface Store {
  id: number;
  type: string;
  name: string;
}

interface StoreInfoResponse {
  code: number;
  paging: {
    total: number;
    offset: number;
    limit: number;
  };
  result: Store[];
}

function isStoreInfoResponse(data: any): data is StoreInfoResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.code === 'number' &&
    typeof data.paging === 'object' &&
    Array.isArray(data.result) &&
    data.result.every((store: any) =>
      typeof store === 'object' &&
      typeof store.id === 'number' &&
      typeof store.type === 'string' &&
      typeof store.name === 'string'
    )
  );
}

async function getPrintfulStoreInfo(apiKey: string): Promise<StoreInfoResponse> {
  const url = 'https://api.printful.com/stores';
  
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!isStoreInfoResponse(data)) {
      throw new Error('Invalid response format from Printful API');
    }

    console.log('Store information retrieved successfully');
    return data;
  } catch (error) {
    console.error('Error retrieving Printful store information:', error);
    throw error;
  }
}

// Usage example
const API_KEY = process.env.PRINTFUL_ALL_STORES_API_KEY!;

getPrintfulStoreInfo(API_KEY)
  .then(response => {
    console.log('Store Information:');
    response.result.forEach(store => {
      console.log(`Store ID: ${store.id}`);
      console.log(`Store Name: ${store.name}`);
      console.log(`Store Type: ${store.type}`);
      console.log('---');
    });
  })
  .catch(error => {
    console.error('Failed to retrieve store information:', error);
  });