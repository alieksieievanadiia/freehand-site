document.addEventListener('DOMContentLoaded', () => {
    const form      = document.getElementById('review-form');
    const container = document.getElementById('reviews-container');
    const sb        = window.supabase;

    // Загружает отзывы из таблицы и рендерит их
    async function loadReviews() {
        const { data, error } = await sb
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Ошибка при загрузке отзывов:', error);
            return;
        }

        container.innerHTML = '';
        data.forEach(r => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
        ${r.photo ? `<img src="${r.photo}" class="review-photo" alt="Photo by ${r.name}">` : ''}
        <p>“${r.text}”</p>
        <div class="author">— ${r.name}</div>
      `;
            container.appendChild(card);
        });
    }

    // Обрабатываем отправку формы
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const nameField = document.getElementById('reviewer-name');
        const textField = document.getElementById('review-text');
        const photoInput = document.getElementById('review-photo');

        const name = nameField.value.trim();
        const text = textField.value.trim();
        if (!name || !text) return;

        let photo = null;
        const file = photoInput.files[0];
        if (file) {
            // конвертим фото в DataURL
            photo = await new Promise(res => {
                const reader = new FileReader();
                reader.onload = () => res(reader.result);
                reader.readAsDataURL(file);
            });
        }

        // Пушим в Supabase
        const { error } = await sb
            .from('reviews')
            .insert([{ name, text, photo }]);

        if (error) {
            console.error('Ошибка при добавлении отзыва:', error);
        } else {
            form.reset();
            loadReviews();
        }
    });

    // Инициално подгружаем отзывы
    loadReviews();
});
