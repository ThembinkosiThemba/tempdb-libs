# TempDB Node client

This is a Javascript client library for interacting with the TempDB server.

## Installation

To use this client in your Javascript project, run:

```sh
npm install tempdb-js
```

## Usage

Here's a basic example of how to use the TempDB JS client:
```javascript
import TempDBClient from "tempdb-js";

async function main() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error('API_KEY environment variable is not set');
        process.exit(1);
    }

    let client;
    try {
        // Initialize the client
        // Parameters:
        // 1. The address (either local or hosted)
        // 2. The database name
        // 3. The API key for access control
        client = new TempDBClient('db-server-url', 'ecommerce-store', apiKey);

        // Example usage when storing product information
        const productData = {
            name: 'Laptop',
            price: 999.99,
            stock: 50,
            Locations: 'US'
        };

        const setResponse = await client.store('p:1', productData);
        console.log('Set product info response:', setResponse);

        // Getting a particular product information
        const getProductInfo = await client.getByKey('p:1');
        console.log('Retrieved product info:', getProductInfo);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        if (client) {
            client.close();
        }
    }
}

main();
```