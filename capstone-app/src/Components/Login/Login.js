import React from 'react';
import './Login.css'

function Login() {
    // const loginForm = document.getElementById('loginForm');
    // const messageBox = document.getElementById('messageBox');

    //     // Function to show a message to the user
    // function showMessage(message, isError = false) {
    //     messageBox.textContent = message;
    //     messageBox.className = 'mt-6 text-center text-sm p-4 rounded-lg visible';
    //     if (isError) {
    //         messageBox.classList.add('bg-red-100', 'text-red-700');
    //     } else {
    //         messageBox.classList.add('bg-green-100', 'text-green-700');
    //     }
    //         // Hide the message after 5 seconds
    //     setTimeout(() => {
    //         messageBox.classList.remove('visible');
    //     }, 5000);
    // }

    // loginForm.addEventListener('submit', async (event) => {
    //     event.preventDefault();

    //     const username = document.getElementById('username').value;
    //     const password = document.getElementById('password').value;

    //     const backendUrl = 'https://your-secure-api-endpoint.com/login'; // Placeholder URL

    //     try {
    //         const response = await fetch(backendUrl, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ username, password })
    //         });

    //             // Check if the response from the server was successful
    //         if (response.ok) {
    //             const data = await response.json();

    //             showMessage('Login successful! Welcome back!', false);
    //             console.log('Server response:', data);


    //                 // window.location.href = '/dashboard';

    //         } else {
    //                 // Handle non-successful responses (e.g., incorrect password)
    //             const errorData = await response.json();
    //             showMessage(`Login failed: ${errorData.message}`, true);
    //             console.error('Login failed:', errorData);
    //         }

    //     } catch (error) {
    //             // Handle network errors or other unexpected issues
    //         showMessage('An error occurred. Please try again later.', true);
    //         console.error('Fetch error:', error);
    //     }
    // });
    return (
        <section className='login-section'>
            <div className="animation-wrapper">
                <div className="animation-container"></div>
            </div>
            <div className="login-container">
                <h2 className="login-h2">Login</h2>
                <form id="loginForm">
                    <div>
                        <label for="username" className='username-label'>Username</label>
                        <input type="text" id="username" name="username" required
                        className="username-input"/>
                    </div>
                    <div>
                        <label for="password" className="password-label">Password</label>
                        <input type="password" id="password" name="password" required
                        className="password-input"/>
                    </div>
                    <button type="submit"
                    className="login-btn">
                    Log In
                    </button>
                </form>
                <div id="messageBox"></div>
            </div>
        </section>
    );
}

export default Login;
