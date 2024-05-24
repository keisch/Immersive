package com.example.Immersiveproject.entities;

import jakarta.persistence.*;

@Table(name = "products")
@Entity
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String Name;

    @Column(nullable = false)
    private String img;

    @Column(length = 400, nullable = false)
    private String description;

    @Column(nullable = false)
    private String summary;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Double price ;

    @Column(nullable = false)
    private boolean featured;

//    @Column(nullable = false)
//    private String stock;


    public Products(String name, String img, String summary , String description, String category, Double price, boolean featured) {
        Name = name;
        this.img = img;
        this.summary = summary;
        this.description = description;
        this.category = category;
        this.price = price;
        this.featured = featured;
    }

    public Integer getId() {
        return id;
    }

    public Products() {
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }
}
