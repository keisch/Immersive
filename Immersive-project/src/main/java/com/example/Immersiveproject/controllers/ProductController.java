package com.example.Immersiveproject.controllers;

import com.example.Immersiveproject.dtos.ProductImagesDto;
import com.example.Immersiveproject.dtos.ProductListCategoryDto;
import com.example.Immersiveproject.dtos.ProductListDto;
import com.example.Immersiveproject.dtos.ProductListPricesDto;
import com.example.Immersiveproject.entities.Products;
import com.example.Immersiveproject.services.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/products")
@RestController
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService){this.productService = productService;}

    @GetMapping
    public ResponseEntity<Page<ProductListDto>> productsList( @RequestParam (required = false) String name,
                                             @RequestParam(required = false) List<String> categories,
                                             @RequestParam(required = false) Boolean featured,
                                             @RequestParam(required = false) List<Double> price,
                                             @RequestParam(required = false) int page,
                                             @RequestParam(defaultValue = "10") int size) {
        Double min = null;
        Double max = null;
        if (price != null && price.size() == 2) {
            min = price.get(0);
            max = price.get(1);
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<ProductListDto> productPage = productService.getProductFilterList(name, categories, featured, min, max, pageable);
        return ResponseEntity.ok(productPage);
    }

    @GetMapping("/details")
    public Products productDetails(@RequestParam Integer productId){
        return productService.getProductDetails(productId);

    }

    @GetMapping("/images")
    public List<ProductImagesDto> productDetails(){
        return productService.getImages();

    }

    @GetMapping("/categoryFilter")
        public List<ProductListCategoryDto> getCategories(){
        return productService.getCategories();
    }

    @GetMapping("/prices")
    public List<ProductListPricesDto> getPrices(){
        return productService.getPrices();
    }

}

