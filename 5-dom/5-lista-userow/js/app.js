document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const userList = document.querySelector('.user-list');

    function deleteUser(event) {
        if (event.target.classList.contains('user-delete')) {
            const userElement = event.target.closest('.user');
            if (userElement) {
                userElement.remove();
            }
        }
    }

    function addUser(event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        if (name && phone) {
            const newUserHtml = `
                <li class="user">
                    <div class="user-data">
                        <div class="user-name">${name}</div>
                        <div class="user-phone">${phone}</div>
                    </div>
                    <button type="button" class="btn user-delete">
                        Usuń
                    </button>
                </li>
            `;
            userList.insertAdjacentHTML('beforeend', newUserHtml);

            nameInput.value = '';
            phoneInput.value = '';
        }
    }

    form.addEventListener('submit', addUser);
    userList.addEventListener('click', deleteUser);
});