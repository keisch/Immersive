package com.example.Immersiveproject.dtos;

public class RegisterUserDto {
    private String email;
    private String password;
    private String Name;
    private String LastName;

    public String getEmail() {
        return email;
    }

    public RegisterUserDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public RegisterUserDto setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getName() {
        return Name;
    }

    public RegisterUserDto setName(String Name) {
        this.Name = Name;
        return this;
    }

    public String getLastName() {
        return LastName;
    }

    public RegisterUserDto setLastName(String LastName) {
        this.LastName = LastName;
        return this;
    }


    @Override
    public String toString() {
        return "RegisterUserDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", Name='" + Name + '\'' +
                ", LastName='" + LastName + '\'' +
                '}';
    }
}
