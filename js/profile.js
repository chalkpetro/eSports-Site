/**
 * This file contains the code for the user profile page.
 * It includes functionality for user login, signup, and profile display.
 * It uses HTML, CSS, and JavaScript.
 *  
 * @author Nikolas J Petroff
 * @version 1.0
 * @since 10-04-2024
 */
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login');
    const signupForm = document.getElementById('signup');
    const userProfile = document.getElementById('user-profile');
    const logoutButton = document.getElementById('logout-button');

    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        showUserProfile(JSON.parse(loggedInUser));
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        // In a real app, you would validate against a backend here
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            showUserProfile(user);
        } else {
            alert('Invalid username or password');
        }
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const profileImage = document.getElementById('profile-image').files[0];
        
        // In a real app, you would send this data to a backend
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.username === username)) {
            alert('Username already exists');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const newUser = { username, email, password, profileImage: event.target.result };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('loggedInUser', JSON.stringify(newUser));
            showUserProfile(newUser);
        };

        if (profileImage) {
            reader.readAsDataURL(profileImage);
        } else {
            const newUser = { username, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('loggedInUser', JSON.stringify(newUser));
            showUserProfile(newUser);
        }
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('signup-form').style.display = 'block';
        userProfile.style.display = 'none';
    });

    function showUserProfile(user) {
        document.getElementById('profile-username').textContent = user.username;
        document.getElementById('profile-email').textContent = user.email;
        if (user.profileImage) {
            document.getElementById('profile-picture').src = user.profileImage;
        }
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'none';
        userProfile.style.display = 'block';
    }
});