import connection from "./connection";

export class IQueryRepository {
  static getOrderItemUnPrint() {
    let query = `
    SELECT 
    order_items.id,
    products.code,
    products.title AS title, 
    orders.set, 
    delivery.name AS delivery, 
    orders.delivery_code, 
    order_items.created_at AS date, 
    product_sku.name AS sku,
    order_items.qty AS qty,
    order_items.addons,
    remark
    FROM order_items
    INNER JOIN orders
    ON orders.id = order_items.order_id
    INNER JOIN products
    ON products.id = order_items.product_id
    INNER JOIN product_sku
    ON product_sku.id = order_items.sku_id
    LEFT JOIN delivery
    ON delivery.id = orders.delivery_id
    WHERE order_items.is_print = TRUE
    AND order_items.order_id IN (640)
    LIMIT 0,5`;

    return new Promise((res, rej) => {
      connection.query(query, (err: any, result: unknown) => {
        if (err) rej(err);
        else res(result);
      });
    });
  }
}
