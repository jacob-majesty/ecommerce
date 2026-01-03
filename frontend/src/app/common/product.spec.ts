import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    const product = new Product(
      'test-sku',
      'test-name',
      'test-description',
      100,
      'test-image.jpg',
      true,
      10,
      new Date(),
      new Date()
    );
    expect(product).toBeTruthy();
  });
});
