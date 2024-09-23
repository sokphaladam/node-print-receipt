import { ThermalPrinter, PrinterTypes } from "node-thermal-printer";
import { createTextImage } from "../lib/createTextImage";

function renderInvoice(invoice: any) {
  return new Promise((res) => {
    const invoiceData = `
    
    តុលេខ៖ ${invoice.set}

    ------------------------------      
    
    កាលបរិច្ឆេទ៖ ${invoice.date}
    
    ------------------------------

    ទំនិញ៖ ${invoice.title} (${invoice.sku}) X${invoice.qty}

    ------------------------------

    ${invoice.addons ? `បន្ថែម៖ ${invoice.addons}` : ""}
    
    ------------------------------
    
    ${
      invoice.remark
        ? `ចំណាំ ${invoice.remark}
    ${
      invoice.delivery
        ? `

        ------------------------------
        
        ដឹកជញ្ជូន៖ ${invoice.delivery} (${invoice.delivery_code})`
        : ""
    }`
        : ""
    }`;
    res(invoiceData);
  });
}

export default async function printReceipt(
  printerName: string,
  // printerName = "//localhost/printer"
  invoice: any
) {
  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: printerName,
    options: {
      timeout: 5000,
    },
  });

  try {
    await printer.isPrinterConnected();
    const invoiceData = await renderInvoice(invoice);
    const imageBuffer = await createTextImage(invoiceData, 650, 500);
    await printer.upsideDown(true);
    // console.log(invoiceData);
    await printer.alignCenter();
    await printer.printQR(invoice.id + "", {
      cellSize: 8,
      correction: "M",
      model: 2,
    });
    await printer.newLine();
    await printer.alignLeft();
    await printer.printImageBuffer(imageBuffer);
    await printer.cut();
    await printer.execute();
    return invoice;
  } catch (err) {
    console.log(err);
    return null;
  }
}
