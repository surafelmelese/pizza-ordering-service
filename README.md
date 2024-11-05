# Pizza Ordering Service

[Live Demo](https://pizza-hub-lac.vercel.app/)

## Overview
A full-stack pizza ordering service built with Next.js, Material UI, and PostgreSQL. This application allows customers to order pizzas with custom toppings and view their order history, while restaurant managers can manage orders, menus, and users within their restaurant.

## Features
- **User Management**: 
  - Customers can browse and order pizzas, view order history.
  - Restaurant Managers can manage pizzas, toppings, orders, and restaurant users with role-based permissions.

- **Restaurant Management**: 
  - Register multiple restaurants, each with a unique menu and custom toppings.
  - Super admin and internal user roles with specific permissions using CASL for authorization.

- **Pizza and Topping Management**: 
  - Dynamic pizza and topping creation.
  - Customize pizza orders with selected toppings based on restaurant offerings.

- **Order Management**: 
  - Customers place orders and choose toppings. 
  - Managers can view and update order status (e.g., Preparing, Delivered).
  - Data validation to ensure orders use only restaurant-provided toppings.

- **Role-Based Access Control**: 
  - Role creation and assignment with permissions to restrict user actions. 
  - Server-side filtering for viewing orders based on various attributes.

## Tech Stack
- **Frontend**: Next.js, Material UI, Material React Table
- **Backend**: Node.js
- **Database**: PostgreSQL
- **Validation**: Zod
- **Authorization**: CASL.js

## Requirements
- **Libraries**: 
  - Material React Table for tables
  - Material UI for UI components
  - Zod for data validation
  - CASL for authorization

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pizza-ordering-service.git
   cd pizza-ordering-service