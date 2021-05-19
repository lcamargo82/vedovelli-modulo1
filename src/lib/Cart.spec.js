import Cart from './Cart';

describe('Cart', () => {
  let cart;
  let product = {
    title: 'Adidas running shoes - men',
    price: 35388, //353.88
  };

  let product2 = {
    title: 'Adidas shoes - women',
    price: 41872,
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2, //70776
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should ensure no more than on product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product,
        quantity: 1,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should update total when a product gets included and remove', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(41872); //valor do segundo produto
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      //expect(cart.checkout()).toMatchSnapshot() cria um novo arquivo com os mesmos dados abaixo

      expect(cart.checkout()).toMatchInlineSnapshot(`
        Object {
          "items": Array [
            Object {
              "product": Object {
                "price": 35388,
                "title": "Adidas running shoes - men",
              },
              "quantity": 2,
            },
            Object {
              "product": Object {
                "price": 41872,
                "title": "Adidas shoes - women",
              },
              "quantity": 3,
            },
          ],
          "total": 196392,
        }
      `);
    });

    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({
        product,
        quantity: 2,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary()).toMatchInlineSnapshot(`
        Object {
          "items": Array [
            Object {
              "product": Object {
                "price": 35388,
                "title": "Adidas running shoes - men",
              },
              "quantity": 2,
            },
            Object {
              "product": Object {
                "price": 41872,
                "title": "Adidas shoes - women",
              },
              "quantity": 3,
            },
          ],
          "total": 196392,
        }
      `);

      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it('should reset the cart when checout() is called', () => {
      cart.add({
        product: product2,
        quantity: 3,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });
});
