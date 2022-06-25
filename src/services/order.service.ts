import OrderModel from '../models/order.model';
import ProductModel from '../models/product.model';
import IOrder from '../interfaces/order.interface';

export default class OrderService {
  public model = new OrderModel();

  public productModel = new ProductModel();

  public getAll = async (): Promise<IOrder[]> => {
    const orders = await this.model.getAll();
    return orders;
  };

  public create = async (userId: number, productsIds: number[]): Promise<IOrder> => {
    const orderId = await this.model.create(userId);
  
    Promise.all(productsIds.map(async (id: number): Promise<void> => {
      await this.productModel.update(orderId, id);
    }));

    return { userId, productsIds } as IOrder;
  };
}