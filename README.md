# Exam-Project-1-UKriiva

## The Edit

The Edit is a curated lifestyle store offering modern essentials across fashion, beauty and technology.
A modern ecommerce web application built with HTML, CSS and vanilla JavaScript using the Noroff API.

### Pages

- /index.html
- /product/index.html
- /account/login.html
- /account/register.html
- /cart/index.html
- /checkout/index.html
- /success/index.html

### Features

- Dynamic product rendering from API
- Responsive product carousel
- Scroll reveal animations
- Product detail pages
- Product image modal preview
- Shopping cart with localStorage
- Dynamic checkout total

### Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Noroff API
- LocalStorage

### Usage

1. **Browse products**
   - Open `/index.html`
   - View featured and dynamic products from the API
   - Browse featured products in the responsive carousel
   - Hover cards for interactive effects
   - Click a product card to view details

2. **View a product**
   - Open `/product/index.html?id=PRODUCT_ID`
   - View product information, tags, pricing and ratings
   - Copy/share product URL directly from the product page
   - Open image modal/lightbox by clicking product image
   - Add products to cart

3. **Shopping cart**
   - Open `/cart/index.html`
   - View added products
   - Clear cart button
   - Increase or decrease quantity
   - Remove items from cart
   - Cart updates dynamically using localStorage

4. **Checkout**
   - Open `/checkout/index.html`
   - Review order summary
   - Dynamic totals update automatically
   - Complete checkout flow
   - Successful orders redirect to confirmation page

5. **Authentication**
   - Register using `/account/register.html`
   - Login using `/account/login.html`
   - Form validation checks password confirmation
   - JWT token storage logic implemented using localStorage


### Data

- Products API: `"https://v2.api.noroff.dev/online-shop"`
- Register API: `https://v2.api.noroff.dev/auth/register`
- Login API: `https://v2.api.noroff.dev/auth/login`

### Authentication

The project includes frontend logic for JWT authentication using the Noroff API.

#### Implemented

- Register form handling
- Login form handling
- Shared JavaScript logic for auth pages
- Password confirmation validation
- API requests to `/auth/register` and `/auth/login`
- Token storage logic using `localStorage`

#### Current status

The frontend authentication flow has been implemented, including login, registration, form validation and token storage logic. Full token verification could not be completely tested during development.

### View Online

- Live site: `https://krii41.github.io/Exam-Project-1-UKriiva/`
- GitHub repo: `https://github.com/Krii41/Exam-Project-1-UKriiva`

### Installation

1. Clone the repository
2. Open the project in VS Code
3. Run using Live Server

### Contact

Created by Urve Kriiva.

