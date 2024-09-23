import { IQueryRepository } from "./database/IQueryRepository";
import cron from "node-cron";
import printReceipt from "./print";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function startService() {
  let count = 0;
  const read: any = await IQueryRepository.getOrderItemUnPrint();

  for (const x of read) {
    let printer = "//localhost/printer";

    if (x.code.substring(0, 2) === "SD") {
      console.log("Print to SD");
      printer = "//localhost/printer";
    } else if (x.code.substring(0, 2) === "BL") {
      console.log("Print to BL");
      printer = "//localhost/printer";
    } else if (x.code.substring(0, 2) === "GR") {
      console.log("Print to GR");
      printer = "//localhost/printer";
    }

    const print = await printReceipt(printer, x);
    await sleep(1);
    if (print) {
      count += 1;
      console.log("Print ======> " + count + "/" + read.length);
    }
  }
}

// startService().then().catch();

cron.schedule("*/5 * * * * *", function () {
  console.log("running a task every 5 second");
  startService()
    .then(() => {
      console.log("===== Print Receipt =====");
    })
    .catch();
});
