import { Socket } from "net";

class TempDBClient {
  constructor(addr, dbName, apiKey) {
    this.addr = addr;
    this.dbName = dbName;
    this.apiKey = apiKey;
    this.conn = null;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.conn = new Socket();
      this.conn.connect(
        this.addr.split(":")[1],
        this.addr.split(":")[0],
        () => {
          resolve();
        }
      );
      this.conn.on("error", (err) => {
        reject(new Error(`Connection error: ${err.message}`));
      });
    });
  }

  close() {
    if (this.conn) {
      this.conn.destroy();
      this.conn = null;
    }
  }

  async sendCommand(command) {
    if (!this.conn) {
      await this.connect();
    }

    return new Promise((resolve, reject) => {
      const fullCommand = `${this.apiKey} ${command}\r\n`;
      this.conn.write(fullCommand);

      this.conn.once("data", (data) => {
        resolve(data.toString().trim());
      });

      this.conn.once("error", (err) => {
        reject(new Error(`Command error: ${err.message}`));
      });
    });
  }

  async set(key, value) {
    return this.sendCommand(`SET ${key} ${value}`);
  }

  async get(key) {
    return this.sendCommand(`GET ${key}`);
  }

  async setEx(key, seconds, value) {
    return this.sendCommand(`SETEX ${key} ${seconds} ${value}`);
  }

  async delete(key) {
    return this.sendCommand(`DELETE ${key}`);
  }

  async lPush(key, value) {
    return this.sendCommand(`LPUSH ${key} ${value}`);
  }

  async sAdd(key, value) {
    return this.sendCommand(`SADD ${key} ${value}`);
  }

  async setData(key, value) {
    const jsonValue = JSON.stringify(value);
    return this.sendCommand(`SETJSON ${key} ${jsonValue}`);
  }

  async getJson(key, field) {
    return this.sendCommand(`GETJSON ${key} /${field}`);
  }

  async viewData() {
    return this.sendCommand("VIEW_DATA");
  }

  async getDB() {
    return this.sendCommand("GET_DB");
  }
}

export default TempDBClient;
