# Python

A Python client for TempDB.

## Installation

You can install the package using pip:

```sh
pip install tempdb-py
```

### Usage

```sh
import os
from tempdb_py import TempDBClient

def main():
    api_key = os.getenv('API_KEY')
    if not api_key:
        print('API_KEY environment variable is not set')
        return

    client = TempDBClient('db-server-url', 'ecommerce-store', api_key)

    try:
        # Example usage when storing product information
        product_data = {
            "name": "Laptop",
            "price": 999.99,
            "stock": 50,
            "Locations": "US"
        }

        set_response = client.store('productX', product_data)
        print('Set product info response:', set_response)

        # Getting a particular product information
        get_product_info = client.get_by_key('productX')
        print('Retrieved product info:', get_product_info)

    except Exception as e:
        print('Error:', str(e))

    finally:
        client.close()

if __name__ == '__main__':
    main()
```
