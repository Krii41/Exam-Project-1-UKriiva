
const API_URL = "https://v2.api.noroff.dev/online-shop";


async function createProductPage() {
    const article = document.getElementById("article");

    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        if (!id) {
            article.textContent = "No product found";
            return;
        }

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch product: $ {response.status}`);
        }

        const result = await response.json();
        const product = result.data;

        renderProduct(product, article);

        if (!product) {
            article.textContent = "Product not found";
            return;
        }


    } catch (error) {
        console.error(error);
        article.textContent = "Something went wrong while loading product.";
    }
}

createProductPage();

function renderProduct(product) {
    const container = document.getElementById("product-container");

    // product image
    const article = document.createElement("article");
    const imageSection = document.createElement("section");
    const img = document.createElement("img");

    article.className = "product-layout grid";
    imageSection.className = "product-image";
    img.src = product.image.url;
    img.alt = product.image.alt;

    imageSection.appendChild(img);

    // product details

    const details = document.createElement("section");
    const header = document.createElement("div");
    const title = document.createElement("h1");
    const shareBtn = document.createElement("button");
    const shareImg = document.createElement("img");

    details.className = "product-details flex";
    header.className = "product-header flex";
    title.textContent = product.title;
    shareBtn.className = "share-link";
    shareImg.src = "../assets/icons/share.png";
    shareImg.alt = "Share product";

    shareBtn.appendChild(shareImg);
    header.append(title, shareBtn);

    // product tags

    const tagsContainer = document.createElement("div");
    tagsContainer.className = "tags flex";

    // product rating

    const ratingContainer = document.createElement("div");
    const star = document.createElement("img");
    const ratingText = document.createElement("span");
    const reviewCount = document.createElement("span");

    ratingContainer.className = "rating flex";
    star.src = "../assets/icons/star.png";
    ratingText.textContent = product.rating;
    reviewCount.textContent = `(${product.reviews.length} reviews)`;

    ratingContainer.append(star, ratingText, reviewCount);

    // product price

    const currentPrice = document.createElement("p");
    const priceOriginal = document.createElement("p");

    currentPrice.className = "price-current";
    priceOriginal.className = "price-original";

    currentPrice.textContent = `$ ${product.discountedPrice ?? product.price}`;

    if (product.discountedPrice < product.price) {
        priceOriginal.textContent = `$ ${product.price}`;
    }
    
    // product description

    const desc = document.createElement("p");
    desc.textContent = product.description;

    // button add to cart

    const btn = document.createElement("button");
    btn.className = "add-to-cart cta-button btn-primary";
    btn.textContent = "Add to Cart";

    details.append(
        header, 
        tagsContainer, 
        ratingContainer, 
        currentPrice,
        priceOriginal,
        desc,
        btn
        );

    // reviews
    
    const reviewsSection = document.createElement("section");
    const reviewsTitle = document.createElement("h2");
    const reviewsList = document.createElement("div");

    reviewsSection.className = "reviews";
    reviewsTitle.innerText = "Reviews";
    reviewsList.className = "review-list grid";

    product.reviews.forEach( r => {
        const review = document.createElement("article");
        const rating = document.createElement("div");

        review.className = "review flex";
        rating.className = "review-rating flex";

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("img");
            star.src = 
            i <= r.rating
            ? "../assets/icons/star.png"
            : "../assets/icons/emptystar.png";
            rating.appendChild(star);
        }

        const text = document.createElement("blockquote");
        const author = document.createElement("p");

        text.className = "review-text";
        text.textContent = `"${r.description}"`;
        author.className = "review-author";
        author.textContent = `${r.username}`;

        review.append(rating, text, author);
        reviewsList.appendChild(review);
        
    });

    reviewsSection.append(reviewsTitle, reviewsList);
    
    article.append(imageSection, details, reviewsSection);
    container.appendChild(article);

    
}