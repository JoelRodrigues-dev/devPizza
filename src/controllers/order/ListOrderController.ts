import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController {
  async handle(req: Request, res: Response) {
    const listOrderService = new ListOrderService();

    const order = listOrderService.execute();

    return res.json(order);
  }
}

export { ListOrderController };
