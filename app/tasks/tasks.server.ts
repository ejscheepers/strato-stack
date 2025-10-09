import { Queue, Worker } from "bullmq";

import { redisConnection } from "./redis.server";

const every1Minute = "every-1-minute";

const every1MinuteQueue = new Queue(every1Minute, {
  connection: redisConnection,
});

new Worker(
  every1Minute,
  async () => {
    console.log("Executing every 1 minute task - stay classy🍾");
  },

  {
    connection: redisConnection,
  }
);

export async function startScheduledTasks() {
  await every1MinuteQueue.upsertJobScheduler(
    every1Minute,
    {
      pattern: "*/1 * * * *",
    },
    {
      name: "every-1-minute-job",
      data: { jobData: "data" },
      opts: {},
    }
  );
}
