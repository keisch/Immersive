package com.example.Immersiveproject.services;

import com.example.Immersiveproject.dtos.ProductImagesDto;
import com.example.Immersiveproject.dtos.ProductListCategoryDto;
import com.example.Immersiveproject.dtos.ProductListDto;
import com.example.Immersiveproject.dtos.ProductListPricesDto;
import com.example.Immersiveproject.entities.Products;
import com.example.Immersiveproject.repositories.ProductRepository;
import org.springframework.data.domain.Pageable;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    public ProductService(ProductRepository productRepository){this.productRepository = productRepository;}

    public List<ProductListDto> getProductsList(){
        List<ProductListDto> productListDtoList = new ArrayList<>();

        productRepository.findAll().forEach(product -> {
            productListDtoList.add(modelMapper.map(product, ProductListDto.class));
        });

        return productListDtoList;
    }

    public Products getProductDetails(Integer id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Product not found"));
    }

    public Page<ProductListDto> getProductFilterList(String name , List<String> categories, Boolean featured, Double min, Double max, Pageable pageable){
        Page<Products> productsPage = productRepository.findProductsByFilters(name, categories, featured, min, max, pageable);
        return productsPage.map(product -> modelMapper.map(product, ProductListDto.class));
    }

    public List<ProductListCategoryDto> getCategories(){
        List<ProductListCategoryDto> productListCategoryDto = new ArrayList<>();

        productRepository.findAll().forEach(product -> {
            productListCategoryDto.add(modelMapper.map(product, ProductListCategoryDto.class));
        });

        return productListCategoryDto;
    }

    public List<ProductListPricesDto> getPrices(){
        List<ProductListPricesDto> productListPricesDto = new ArrayList<>();

        productRepository.findAll().forEach(product -> {
            productListPricesDto.add(modelMapper.map(product, ProductListPricesDto.class));
        });

        return productListPricesDto;
    }

    public List<ProductImagesDto> getImages(){
        List<ProductImagesDto> productImagesDto = new ArrayList<>();

        productRepository.findAll().forEach(product -> {
            if(product.isFeatured()){
                productImagesDto.add(modelMapper.map(product, ProductImagesDto.class));
            }
        });
        return productImagesDto;
    }


}
