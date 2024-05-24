import IProduct from "../models/product/product-interface";

const productsList: IProduct[] = [
  {
    id: 1,
    name: "Arabica Medium Roast",
    image: "/images/images-sm/maquina1-sm.jpg",
    description: "Smooth, flavorful Arabica medium roast from lush highlands.",
    summary:
      "Discover the essence of Vietnamese Robusta coffee beans  smooth and flavorful. Sourced from the lush highlands of Vietnam, these beans offer a rich and satisfying taste profile that's sure to please any coffee lover. Whether enjoyed black or with milk, this brew promises a delightful experience with every sip. Elevate your mornings with the robust and aromatic flavors of Vietnamese Robusta coffee.",
    brand: "Vietnamese Coffee Company",
    category: "Coffee Beans",
    price: 12.99,
    featured: false,
    quantity: 0,
  },
  {
    id: 2,
    category: "Coffee Machines",
    name: "Espresso Maker",
    description: "Efficient espresso maker for rich shots.",
    summary:
      "Experience the unparalleled convenience and indulgence of freshly brewed espresso with our Espresso Maker. Crafted with precision and efficiency, this machine ensures every shot is rich, flavorful, and perfectly extracted. Elevate your coffee experience with the sophistication of professional-grade espresso right in your home.",
    price: 199.99,
    image: "/images/images-sm/maquina2-sm.jpg",
    brand: "Vietnamese Coffee Company",
    featured: true,
    quantity: 0,
  },
  {
    id: 3,
    category: "Coffee accesories",
    name: "Robusta Dark Roast",
    description: "Bold and intense Robusta dark roast for strong brews.",
    summary:
      "Delve into the bold and intense flavors of our Robusta Dark Roast coffee beans. Sourced from the finest regions, these beans are expertly roasted to perfection, resulting in a brew that's robust, full-bodied, and satisfyingly strong. Perfect for those who crave a powerful kick to start their day. Elevate your coffee ritual with the unmistakable boldness of Robusta Dark Roast.",
    price: 9.49,
    image: "/images/images-sm/maquina3-sm.jpg",
    brand: "Vietnamese Coffee Company",
    featured: true,
    quantity: 0,
  },
  {
    id: 4,
    category: "Coffee Machines",
    name: "Drip Coffee Maker",
    description: "Efficient drip coffee maker for large batches.",
    summary:
      "Introducing our Drip Coffee Maker, designed to deliver efficiency without compromising on flavor. Whether you're brewing for a crowd or savoring a quiet moment, this machine ensures a consistent and flavorful pot every time. Elevate your coffee experience with the convenience and reliability of our Drip Coffee Maker.",
    price: 59.99,
    image: "/images/images-sm/maquina4-sm.jpg",
    brand: "Vietnamese Coffee Company",
    featured: true,
    quantity: 0,
  },
  {
    id: 5,
    category: "Coffee Beans",
    name: "Ethiopian Yirgacheffe",
    description:
      "Bright, floral Ethiopian Yirgacheffe beans for exotic flavor.",
    summary:
      "Embark on a journey of exotic flavors with our Ethiopian Yirgacheffe coffee beans. Grown in the fertile soils of Ethiopia, these beans boast vibrant floral notes and a bright acidity that tantalizes the taste buds. Perfect for those who seek adventure in every cup. Elevate your coffee experience with the exotic allure of Ethiopian Yirgacheffe.",
    price: 101.99,
    image: "/images/images-sm/maquina5-sm.jpg",
    brand: "Vietnamese Coffee Company",
    featured: false,
    quantity: 0,
  },
  {
    id: 6,
    category: "Coffee accesories",
    name: "French Press",
    description: "Classic manual brewing with French Press convenience.",
    summary:
      "Experience the timeless art of manual brewing with our French Press. Crafted with precision and elegance, this classic coffee maker allows you to savor the full richness and aroma of your coffee grounds. Elevate your mornings with the simplicity and authenticity of French Press brewing.",
    price: 29.99,
    image: "/images/images-sm/maquina6-sm.jpg",
    brand: "Vietnamese Coffee Company",
    featured: false,
    quantity: 0,
  },
  {
    id: 7,
    category: "Coffee Beans",
    name: "Colombian Supremo",
    description:
      "Balanced, nutty Colombian Supremo beans for a satisfying brew.",
    summary:
      "Indulge in the rich and nutty flavors of our Colombian Supremo coffee beans. Sourced from the high altitudes of Colombia, these beans offer a perfectly balanced brew with hints of chocolate and a satisfying nuttiness. Elevate your coffee experience with the smooth and flavorful taste of Colombian Supremo.",
    price: 11.79,
    image: "/images/images-sm/maquina7-sm.jpg",
    brand: "Vietnamese Coffee Company",
    featured: false,
    quantity: 0,
  },
  {
    id: 8,
    category: "Coffee Machines",
    name: "Single Serve Pod Brewer",
    description: "Convenient single-serve pod brewer for quick cups.",
    summary:
      "Experience convenience without compromise with our Single Serve Pod Brewer. Whether you're rushing out the door or enjoying a leisurely afternoon, this machine delivers a perfect cup of coffee with just the touch of a button. Elevate your coffee ritual with the ease and efficiency of our Single Serve Pod Brewer.",
    price: 79.99,
    image: "/images/images-sm/maquina8-sm.jpg",
    brand: "Vietnamese Coffee Company",
    featured: false,
    quantity: 0,
  },
  {
    id: 9,
    category: "Coffee accesories",
    name: "Brazilian Santos",
    description: "Smooth Brazilian Santos beans with chocolate notes.",
    summary:
      "Indulge in the velvety smoothness of our Brazilian Santos coffee beans. Sourced from the rolling hills of Brazil, these beans boast a rich and creamy texture with delightful hints of chocolate. Perfect for those who crave indulgence in every sip. Elevate your coffee experience with the luxurious taste of Brazilian Santos.",
    price: 10.49,
    image: "/images/images-sm/maquina9-sm.jpg",
    brand: "Vietnamese Coffee Company",
    featured: false,
    quantity: 0,
  },
  {
    id: 10,
    category: "Coffee Machines",
    name: "Pour-Over Brewer",
    description: "Manual pour-over brewer for artisanal coffee.",
    summary:
      "Unlock the artistry of coffee brewing with our Pour-Over Brewer. Designed for precision and control, this manual brewing method allows you to extract the full spectrum of flavors from your coffee grounds. Elevate your coffee ritual with the craftsmanship and elegance of Pour-Over brewing.",
    price: 39.99,
    image: "/images/images-sm/maquina10-sm.jpg",
    brand: "Vietnamese Coffee Company",
    featured: false,
    quantity: 0,
  },

  {
    id: 11,
    category: "Coffee Beans",
    name: "Decaf Swiss Water Process",
    description:
      "Caffeine-free but flavorful decaf beans for guilt-free indulgence.",
    summary:
      "Experience the rich and satisfying taste of coffee without the caffeine with our Decaf Swiss Water Process beans. Crafted using a natural decaffeination process, these beans retain all the flavor and aroma of traditional coffee without the jitters. Elevate your coffee experience with the guilt-free indulgence of Decaf Swiss Water Process.",
    price: 13.99,
    image: "/images/images-sm/maquina11-sm.jpg",
    brand: "Vietnamese Coffee Company",
    featured: false,
    quantity: 0,
  },
  {
    id: 12,
    category: "Coffee accesories",
    name: "Cold Brew Maker",
    description: "Convenient cold brew maker for refreshing drinks.",
    summary:
      "Beat the heat and indulge in the refreshing goodness of cold brew with our Cold Brew Maker. Designed for convenience and simplicity, this machine allows you to enjoy smooth and flavorful cold brew at home. Elevate your summer days with the cool and invigorating taste of homemade cold brew.",
    price: 49.99,
    image: "/images/images-sm/maquina12-sm.jpg",
    brand: "Vietnamese Coffee Company",
    featured: false,
    quantity: 0,
  },
];
export default productsList;
