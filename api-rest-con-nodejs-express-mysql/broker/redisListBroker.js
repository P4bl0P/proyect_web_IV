import { createClient } from "redis";

export class RedisListBroker {
  constructor({ url }) {
    this.client = createClient({ url });
  }

  async connect() {
    this.client.on("error", (err) => console.error("Redis error:", err));
    await this.client.connect();
  }

  async close() {
    await this.client.quit();
  }

  async push(queue, item) {
    await this.client.lPush(queue, JSON.stringify(item));
  }

  async getAll(queue) {
    const items = await this.client.lRange(queue, 0, -1);
    return items.map((i) => JSON.parse(i));
  }

  async remove(queue, item) {
    await this.client.lRem(queue, 1, JSON.stringify(item));
  }

  async move(queueFrom, queueTo, item) {
    await this.remove(queueFrom, item);
    await this.push(queueTo, item);
  }
}
