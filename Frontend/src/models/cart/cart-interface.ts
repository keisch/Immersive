export default interface ICartItem {
    products: {
      id: number;
      img: string;
      name: string;
      price: number;
      description: string;
      summary: string;
      category: string;
      featured: boolean;
    };
    quantity: number;
  }