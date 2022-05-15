import OrderModel from '../models/order.model';
import IOrder from '../interfaces/order.interface';

export default class OrderService {
  public model = new OrderModel();

  public getAll = async (): Promise<IOrder[]> => {
    const orders = await this.model.getAll();
    return orders;
  };

  // public create = async (name: string, amount: string): Promise<IOrder> => {
  //   const order = await this.model.create(name, amount);
  //   return order;
  // };
}