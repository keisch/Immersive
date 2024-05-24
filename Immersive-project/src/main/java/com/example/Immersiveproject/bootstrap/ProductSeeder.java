package com.example.Immersiveproject.bootstrap;

import com.example.Immersiveproject.entities.Products;
import com.example.Immersiveproject.repositories.ProductRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductSeeder implements ApplicationListener<ContextRefreshedEvent> {

    private final ProductRepository productRepository;
    private boolean alreadySeeded = false;

    public ProductSeeder(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        if (!alreadySeeded) {
            seedProducts();
            alreadySeeded = true;
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            List<Products> productsList = ProductsList();

            for (Products product : productsList) {
                productRepository.save(product);
            }
        }
    }

    private List<Products> ProductsList() {
        return List.of(
                new Products("Arabica Medium Roast", "/images/images-sm/maquina1-sm.jpg", "Smooth, flavorful Arabica medium roast from lush highlands.", "Discover the essence of Vietnamese Robusta coffee beans  smooth and flavorful. Sourced from the lush highlands of Vietnam, these beans offer a rich and satisfying taste profile that's sure to please any coffee lover. Whether enjoyed black or with milk, this brew promises a delightful experience with every sip. Elevate your mornings with the robust and aromatic flavors of Vietnamese Robusta coffee.", "Coffee Beans", 12.99, false),
                new Products("Espresso Maker", "/images/images-sm/maquina2-sm.jpg", "Efficient espresso maker for rich shots.", "Experience the unparalleled convenience and indulgence of freshly brewed espresso with our Espresso Maker. Crafted with precision and efficiency, this machine ensures every shot is rich, flavorful, and perfectly extracted. Elevate your coffee experience with the sophistication of professional-grade espresso right in your home.", "Coffee Machines", 199.99, true),
                new Products("Robusta Dark Roast", "/images/images-sm/maquina3-sm.jpg", "Bold and intense Robusta dark roast for strong brews.", "Delve into the bold and intense flavors of our Robusta Dark Roast coffee beans. Sourced from the finest regions, these beans are expertly roasted to perfection, resulting in a brew that's robust, full-bodied, and satisfyingly strong. Perfect for those who crave a powerful kick to start their day. Elevate your coffee ritual with the unmistakable boldness of Robusta Dark Roast.", "Coffee Beans", 9.49, true),
                new Products("Drip Coffee Maker", "/images/images-sm/maquina4-sm.jpg", "Efficient drip coffee maker for large batches.", "Introducing our Drip Coffee Maker, designed to deliver efficiency without compromising on flavor. Whether you're brewing for a crowd or savoring a quiet moment, this machine ensures a consistent and flavorful pot every time. Elevate your coffee experience with the convenience and reliability of our Drip Coffee Maker.", "Coffee Machines", 59.99, true),
                new Products("Ethiopian Yirgacheffe", "/images/images-sm/maquina5-sm.jpg", "Bright, floral Ethiopian Yirgacheffe beans for exotic flavor.", "Embark on a journey of exotic flavors with our Ethiopian Yirgacheffe coffee beans. Grown in the fertile soils of Ethiopia, these beans boast vibrant floral notes and a bright acidity that tantalizes the taste buds. Perfect for those who seek adventure in every cup. Elevate your coffee experience with the exotic allure of Ethiopian Yirgacheffe.", "Coffee Beans", 101.99, false),
                new Products("French Press", "/images/images-sm/maquina6-sm.jpg", "Classic manual brewing with French Press convenience.", "Experience the timeless art of manual brewing with our French Press. Crafted with precision and elegance, this classic coffee maker allows you to savor the full richness and aroma of your coffee grounds. Elevate your mornings with the simplicity and authenticity of French Press brewing.", "Coffee Accessories", 29.99, false),
                new Products("Colombian Supremo", "/images/images-sm/maquina7-sm.jpg", "Balanced, nutty Colombian Supremo beans for a satisfying brew.", "Indulge in the rich and nutty flavors of our Colombian Supremo coffee beans. Sourced from the high altitudes of Colombia, these beans offer a perfectly balanced brew with hints of chocolate and a satisfying nuttiness. Elevate your coffee experience with the smooth and flavorful taste of Colombian Supremo.", "Coffee Beans", 11.79, false),
                new Products("Single Serve Pod Brewer", "/images/images-sm/maquina8-sm.jpg", "Convenient single-serve pod brewer for quick cups.", "Experience convenience without compromise with our Single Serve Pod Brewer. Whether you're rushing out the door or enjoying a leisurely afternoon, this machine delivers a perfect cup of coffee with just the touch of a button. Elevate your coffee ritual with the ease and efficiency of our Single Serve Pod Brewer.", "Coffee Machines", 79.99, false),
                new Products("Brazilian Santos", "/images/images-sm/maquina9-sm.jpg", "Smooth Brazilian Santos beans with chocolate notes.", "Indulge in the velvety smoothness of our Brazilian Santos coffee beans. Sourced from the rolling hills of Brazil, these beans boast a rich and creamy texture with delightful hints of chocolate. Perfect for those who crave indulgence in every sip. Elevate your coffee experience with the luxurious taste of Brazilian Santos.", "Coffee Accessories", 10.49, false),
                new Products("Pour-Over Brewer", "/images/images-sm/maquina10-sm.jpg", "Manual pour-over brewer for artisanal coffee.", "Unlock the artistry of coffee brewing with our Pour-Over Brewer. Designed for precision and control, this manual brewing method allows you to extract the full spectrum of flavors from your coffee grounds. Elevate your coffee ritual with the craftsmanship and elegance of Pour-Over brewing.", "Coffee Machines", 39.99, false),
                new Products("Decaf Swiss Water Process", "/images/images-sm/maquina11-sm.jpg", "Caffeine-free but flavorful decaf beans for guilt-free indulgence.", "Experience the rich and satisfying taste of coffee without the caffeine with our Decaf Swiss Water Process beans. Crafted using a natural decaffeination process, these beans retain all the flavor and aroma of traditional coffee without the jitters. Elevate your coffee experience with the guilt-free indulgence of Decaf Swiss Water Process.", "Coffee Beans", 13.99, false),
                new Products("Cold Brew Maker", "/images/images-sm/maquina12-sm.jpg", "Convenient cold brew maker for refreshing drinks.", "Beat the heat and indulge in the refreshing goodness of cold brew with our Cold Brew Maker. Designed for convenience and simplicity, this machine allows you to enjoy smooth and flavorful cold brew at home. Elevate your summer days with the cool and invigorating taste of homemade cold brew.", "Coffee Accessories", 49.99, false)
        );
    }
}
