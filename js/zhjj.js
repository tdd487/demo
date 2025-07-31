
    document.addEventListener('DOMContentLoaded', function() {
        const cardList = document.getElementById('card-list');
        const cards = cardList.querySelectorAll('.card-wrapper');

        // 克隆所有卡片并添加到列表末尾，实现无缝衔接
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            cardList.appendChild(clone);
        });

        // 当动画完成一次循环后，重置位置
        cardList.addEventListener('animationiteration', function() {
        // 不需要手动重置，因为translateX(-50%)会自动回到起点
        });

        const cardList1 = document.getElementById('card-list1');
        const cards1 = cardList1.querySelectorAll('.card-wrapper');

        // 克隆所有卡片并添加到列表末尾，实现无缝衔接
        cards1.forEach(card => {
            const clone = card.cloneNode(true);
            cardList1.appendChild(clone);
        });

        // 当动画完成一次循环后，重置位置
        cardList1.addEventListener('animationiteration', function() {
            // 不需要手动重置，因为translateX(-50%)会自动回到起点
        });

        const notices = document.getElementById('notice-s');
        const li = notices.querySelectorAll('li');

        // 克隆所有卡片并添加到列表末尾，实现无缝衔接
        li.forEach(card => {
            const clone = card.cloneNode(true);
            notices.appendChild(clone);
        });

        // 当动画完成一次循环后，重置位置
        notices.addEventListener('animationiteration', function() {
            // 不需要手动重置，因为translateX(-50%)会自动回到起点
        });
});