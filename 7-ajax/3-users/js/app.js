const usersList = document.querySelector('#usersList');
const templateUser = document.querySelector('#templateElement');
const templatePost = document.querySelector('#templatePost');

const API_BASE = 'https://jsonplaceholder.typicode.com';

async function getUsers() {
    try {
        const response = await fetch(`${API_BASE}/users`);
        const users = await response.json();
        console.log(users);
        users.forEach(user => createUserElement(user));
    } catch (error) {
        console.error('Błąd pobierania użytkowników:', error);
    }
}

function createUserElement(user) {
    const clone = templateUser.content.cloneNode(true);
    const article = document.createElement('article');
    article.classList.add('user-cnt');
    article.setAttribute('data-id', user.id);

    const userName = clone.querySelector('.user-name');
    userName.textContent = user.name;

    const userPhone = clone.querySelector('.user-phone');
    userPhone.textContent = user.phone.split(' ')[0];

    const userEmailLink = clone.querySelector('.user-email');
    userEmailLink.href = `mailto: ${user.email}`;
    userEmailLink.textContent = user.email;

    const showPostsButton = clone.querySelector('.user-show-posts');
    showPostsButton.addEventListener('click', toggleUserPosts);

    article.appendChild(clone);
    usersList.appendChild(article);
}

function toggleUserPosts(event) {
    const button = event.currentTarget;
    const article = button.closest('.user-cnt');
    const postsList = article.querySelector('.user-posts');
    const userId = article.getAttribute('data-id');

    if (postsList.classList.contains('active')) {
        postsList.classList.remove('active');
        button.textContent = 'Show posts';
    } else {
        if (postsList.children.length === 0) {
            fetchAndRenderPosts(userId, postsList);
        }
        postsList.classList.add('active');
        button.textContent = 'Hide posts';
    }
}

async function fetchAndRenderPosts(userId, postsList) {
    try {
        const response = await fetch(`${API_BASE}/posts?userId=${userId}`);
        const posts = await response.json();
        posts.forEach(post => createPostElement(post, postsList));
    } catch (error) {
        console.error(`Błąd pobierania postów dla użytkownika ${userId}:`, error);
    }
}

function createPostElement(post, postsList) {
    const clone = templatePost.content.cloneNode(true);
    const li = document.createElement('li');
    li.classList.add('post');

    const postTitle = clone.querySelector('.post-title');
    postTitle.textContent = post.title;

    const postBody = clone.querySelector('.post-body');
    postBody.textContent = post.body;

    li.appendChild(clone);
    postsList.appendChild(li);
}

document.addEventListener('DOMContentLoaded', getUsers);