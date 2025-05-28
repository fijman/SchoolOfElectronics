 // Добавляем стили для модального окна
const modalStyles = `
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeInBackground 0.3s ease-out forwards;
}

@keyframes fadeInBackground {
    from { background-color: rgba(0, 0, 0, 0); }
    to { background-color: rgba(0, 0, 0, 0.85); }
}

.modal-content {
    background-color: #1a1a1a;
    border: 2px solid #ffeb3b;
    border-radius: 15px;
    width: 90%;
    max-width: 700px;
    position: relative;
    animation: modalFadeIn 0.3s ease-out;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #ffeb3b;
}

.modal-logo {
    height: 40px;
    width: auto;
}

.close-button {
    background: none;
    border: none;
    color: #ffeb3b;
    font-size: 28px;
    cursor: pointer;
    transition: transform 0.3s ease, color 0.3s ease;
}

.close-button:hover {
    transform: scale(1.2);
    color: #ffffff;
}

.modal-body {
    padding: 20px;
}

.menu-nav {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.menu-item {
    color: #ffffff;
    text-decoration: none;
    font-size: 1.3rem;
    padding: 12px;
    border-radius: 8px;
    transition: all 0.3s ease;
    text-align: center;
    border: 1px solid transparent;
}

.menu-item:hover {
    background-color: rgba(255, 235, 59, 0.1);
    color: #ffeb3b;
    transform: scale(1.03);
    border-color: #ffeb3b;
}

.modal-footer {
    padding: 20px;
    border-top: 1px solid #ffeb3b;
    text-align: center;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-bottom: 15px;
}

.social-link {
    color: #ffeb3b;
    font-size: 28px;
    transition: transform 0.3s ease, color 0.3s ease;
}

.social-link:hover {
    transform: scale(1.3);
    color: #ffffff;
}

.copyright {
    color: #b0bec5;
    font-size: 0.95rem;
    margin-top: 10px;
}

@media (max-width: 600px) {
    .modal-content {
        width: 95%;
        padding: 15px;
    }

    .modal-header {
        padding: 15px;
    }

    .modal-logo {
        height: 35px;
    }

    .close-button {
        font-size: 24px;
    }

    .modal-body {
        padding: 15px;
    }

    .menu-nav {
        gap: 12px;
    }

    .menu-item {
        font-size: 1.1rem;
        padding: 10px;
    }

    .modal-footer {
        padding: 15px;
    }

    .social-links {
        gap: 20px;
    }

    .social-link {
        font-size: 24px;
    }

    .copyright {
        font-size: 0.9rem;
    }
}
`;

// Создаем и добавляем стили в head
const styleSheet = document.createElement("style");
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Функция для определения базового пути
function getBasePath() {
const path = window.location.pathname;
const pathParts = path.split('/');
pathParts.pop();
const basePath = pathParts.filter(Boolean).map(() => '..').join('/');
return basePath || '.';
}

// Функция для создания модального окна
function createModal() {
const basePath = getBasePath();
const modalHTML = `
    <div class="modal" id="menuModal">
        <div class="modal-content">
            <div class="modal-header">
                <img src="${basePath}/src/logo.png" alt="Школа Электроники Логотип" class="modal-logo">
                <button class="close-button">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <nav class="menu-nav">
                    <a href="${basePath}/index.html" class="menu-item">Главная</a>
                    <a href="#" class="menu-item">О нас</a>
                    <a href="${basePath}/achievement/achievement.html" class="menu-item">Достижения</a>
                    <a href="${basePath}/contact.html" class="menu-item">Оставить заявку</a>
                </nav>
            </div>
            <div class="modal-footer">
                <div class="social-links">
                    <a href="#" class="social-link"><i class="fab fa-vk"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-telegram"></i></a>
                    <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
                </div>
                <p class="copyright">© 2024 Школа Электроники. Все права защищены.</p>
            </div>
        </div>
    </div>
`;

// Добавляем модальное окно в конец body
document.body.insertAdjacentHTML('beforeend', modalHTML);

// Добавляем обработчики событий
const menuButton = document.querySelector('.menu-button');
const modal = document.getElementById('menuModal');
const closeButton = document.querySelector('.close-button');

// Убедимся, что модальное окно скрыто при создании
if (modal) {
    modal.style.display = 'none';
}

menuButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', createModal);