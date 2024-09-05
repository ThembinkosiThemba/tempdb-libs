import TempDBClient from "tempdb-js";
import process from "process";

const main = async () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY environment variable is not set");
    process.exit(1);
  }

  try {
    const client = await TempDBClient.newClient(
      "0.0.0.0:3000",
      "ecommerce-store",
      apiKey
    );
    process.on("exit", () => client.close());

    // Example usage when storing product information
    let response = await client.setData("p:4", {
      name: "Laptop-JS",
      price: 999.99,
      stock: 50,
      Locations: "US",
    });
    console.log("Set user info response:", response);

    // Getting a particular product information
    const getProductInfo = await client.get("p:1");
    console.log("Data:", getProductInfo);
  } catch (err) {
    console.error("Error:", err);
  }
};

main();
