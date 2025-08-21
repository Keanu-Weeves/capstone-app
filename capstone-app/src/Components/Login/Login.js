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
            <div className="animation-container"></div>
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


// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Secure Credential Handler</title>
//     <script src="https://cdn.tailwindcss.com"></script>
//     <style>
//         body {
//             font-family: 'Inter', sans-serif;
//             background-color: #f3f4f6;
//         }

//         #messageBox {
//             opacity: 0;
//             transition: opacity 0.3s ease-in-out;
//         }
//         #messageBox.visible {
//             opacity: 1;
//         }
//     </style>
// </head>
// <body class="flex items-center justify-center min-h-screen">

//     <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border-2 border-gray-200">
//         <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

//         <form id="loginForm" class="space-y-6">
//             <div>
//                 <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
//                 <input type="text" id="username" name="username" required
//                        class="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
//             </div>
//             <div>
//                 <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
//                 <input type="password" id="password" name="password" required
//                        class="mt-1 block w-full px-4 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
//             </div>
//             <button type="submit"
//                     class="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
//                 Log In
//             </button>
//         </form>

//         <div id="messageBox" class="mt-6 text-center text-sm p-4 rounded-lg invisible"></div>
//     </div>

//     <script>
//         const loginForm = document.getElementById('loginForm');
//         const messageBox = document.getElementById('messageBox');

//         // Function to show a message to the user
//         function showMessage(message, isError = false) {
//             messageBox.textContent = message;
//             messageBox.className = 'mt-6 text-center text-sm p-4 rounded-lg visible';
//             if (isError) {
//                 messageBox.classList.add('bg-red-100', 'text-red-700');
//             } else {
//                 messageBox.classList.add('bg-green-100', 'text-green-700');
//             }
//             // Hide the message after 5 seconds
//             setTimeout(() => {
//                 messageBox.classList.remove('visible');
//             }, 5000);
//         }

//         loginForm.addEventListener('submit', async (event) => {
//             event.preventDefault();

//             const username = document.getElementById('username').value;
//             const password = document.getElementById('password').value;

//             const backendUrl = 'https://your-secure-api-endpoint.com/login'; // Placeholder URL

//             try {
//                 const response = await fetch(backendUrl, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ username, password })
//                 });

//                 // Check if the response from the server was successful
//                 if (response.ok) {
//                     const data = await response.json();

//                     showMessage('Login successful! Welcome back!', false);
//                     console.log('Server response:', data);


//                     // window.location.href = '/dashboard';

//                 } else {
//                     // Handle non-successful responses (e.g., incorrect password)
//                     const errorData = await response.json();
//                     showMessage(`Login failed: ${errorData.message}`, true);
//                     console.error('Login failed:', errorData);
//                 }

//             } catch (error) {
//                 // Handle network errors or other unexpected issues
//                 showMessage('An error occurred. Please try again later.', true);
//                 console.error('Fetch error:', error);
//             }
//         });
//     </script>
// </body>
// </html>