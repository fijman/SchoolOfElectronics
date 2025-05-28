// Добавляем стили для модального окна
const modalStyles = `
    .modal {
        display: none; /* Скрыто по умолчанию, управляется JS */
        position: fixed; /* Фиксируем на экране */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.85); /* Увеличиваем прозрачность для более темного фона */
        z-index: 1000; /* Высокий z-index */
        display: flex; /* Используем Flexbox для центрирования */
        justify-content: center;
        align-items: center;
        /* Убедимся, что анимация применяется при появлении */
        animation: fadeInBackground 0.3s ease-out forwards;
    }

    @keyframes fadeInBackground {
        from { background-color: rgba(0, 0, 0, 0); }
        to { background-color: rgba(0, 0, 0, 0.85); }
    }

    .modal-content {
        background-color: #1a1a1a; /* Темнее фон контента */
        border: 2px solid #ffeb3b;
        border-radius: 15px;
        width: 90%; /* Увеличим базовую ширину */
        max-width: 700px; /* Увеличим максимальную ширину */
        position: relative;
        animation: modalFadeIn 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); /* Добавим тень */
        overflow: hidden; /* Скрываем все, что выходит за границы */
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
        height: 40px; /* Немного уменьшим логотип */
        width: auto;
    }

    .close-button {
        background: none;
        border: none;
        color: #ffeb3b;
        font-size: 28px; /* Увеличим размер кнопки закрытия */
        cursor: pointer;
        transition: transform 0.3s ease, color 0.3s ease;
    }

    .close-button:hover {
        transform: scale(1.2); /* Увеличим эффект при наведении */
        color: #ffffff; /* Цвет при наведении */
    }

    .modal-body {
        padding: 20px;
    }

    .menu-nav {
        display: flex;
        flex-direction: column;
        gap: 18px; /* Увеличим отступ между пунктами */
    }

    .menu-item {
        color: #ffffff;
        text-decoration: none;
        font-size: 1.3rem; /* Немного увеличим размер шрифта меню */
        padding: 12px; /* Увеличим отступы */
        border-radius: 8px; /* Немного больше скругление */
        transition: all 0.3s ease;
        text-align: center;
        border: 1px solid transparent; /* Добавим невидимую границу */
    }

    .menu-item:hover {
        background-color: rgba(255, 235, 59, 0.1); /* Легкий желтый фон при наведении */
        color: #ffeb3b; /* Желтый цвет текста при наведении */
        transform: scale(1.03); /* Меньший эффект увеличения */
        border-color: #ffeb3b; /* Желтая граница при наведении */
    }

    .modal-footer {
        padding: 20px;
        border-top: 1px solid #ffeb3b;
        text-align: center;
    }

    .social-links {
        display: flex;
        justify-content: center;
        gap: 25px; /* Увеличим отступ между иконками */
        margin-bottom: 15px;
    }

    .social-link {
        color: #ffeb3b;
        font-size: 28px; /* Увеличим размер иконок */
        transition: transform 0.3s ease, color 0.3s ease;
    }

    .social-link:hover {
        transform: scale(1.3); /* Увеличим эффект при наведении */
        color: #ffffff; /* Цвет при наведении */
    }

    .copyright {
        color: #b0bec5; /* Более мягкий цвет */
        font-size: 0.95rem; /* Немного больше размер */
        margin-top: 10px;
    }

    /* Адаптивные стили для модального окна */
    @media (max-width: 600px) {
        .modal-content {
            width: 95%; /* Оставляем широким на мобильных */
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

// Функция для создания модального окна
function createModal() {
    const modalHTML = `
        <div class="modal" id="menuModal">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="src/logo.png" alt="Школа Электроники Логотип" class="modal-logo">
                    <button class="close-button">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <nav class="menu-nav">
                        <a href="index.html" class="menu-item">Главная</a>
                        <a href="#" class="menu-item">О нас</a>
                        <a href="achievement/achievement.html" class="menu-item">Достижения</a>
                        <a href="#" class="menu-item">Контакты</a>
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

