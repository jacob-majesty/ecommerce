import { OrderItem } from './order-item';

describe('OrderItem', () => {
  it('should create an instance', () => {
    const orderItem = new OrderItem('test-image.jpg', 99.99, 1, 'test-product-1');
    expect(orderItem).toBeTruthy();
    expect(orderItem.imageUrl).toBe('test-image.jpg');
    expect(orderItem.unitPrice).toBe(99.99);
    expect(orderItem.quantity).toBe(1);
    expect(orderItem.productId).toBe('test-product-1');
  });
});
