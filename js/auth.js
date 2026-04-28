const API_BASE_URL = "https://v2.api.noroff.dev";

//  /auth/register
//  name, email, password

//  /auth/login
//  email, password

async function registerUser(url, userData) {
    console.log(url, userData);
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData)
        const result = await response.json();

        console.log(result);

    } catch (error) {
        console.error("It does not work", error);
    }
}

const userToRegister = document.getElementById("register-form");

if (userToRegister) {
    userToRegister.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData(userToRegister);
    
        const name = formData.get("fullName");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        const registerUrl = `${API_BASE_URL}/auth/register`;
    
        registerUser(registerUrl, { name, email, password});
    })
}

//  login

async function loginUser(url, userData) {
    try {
        const postData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        console.log(response);

        const json = await response.json();
        const accessToken = json.data?.accessToken;

        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }

    } catch (error) {
        console.log(error);
    }

}

const loginForm = document.getElementById("login-form");

if(loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData(loginForm);
    
        const email = formData.get("email");
        const password = formData.get("password");
    
        
        const loginUrl = `${API_BASE_URL}/auth/login`;
    
        loginUser(loginUrl, { email, password});
    });
}


