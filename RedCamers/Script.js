'use strict';

// При загрузке страницы экран - чёрный
let unloaded= document.querySelector('.unloaded '); 

window.addEventListener('DOMContentLoaded', function() {
	// Удаляем после загрузки страницы чёрный экран
	unloaded.style.display = 'none'; 

	// Подключаем переменные
	let
		btnSearch		= document.querySelector('#btn-search'),	// Кнопка поиска по сайту
		searchArea		= document.querySelector('#search-area'),   // Поле ввода поиска по сайту
		repl			= false,									// Отслеживает состояние поисковой строки  
		btnBuy			= document.querySelectorAll('.btn-buy'),	// Кнопка покупки товара
		buyItem			= 0,										// Кол-во купленных товаров
		counter 		= document.querySelector('.counter'),		// Счётчик купленных товаров
		purchases		= [],										// Массив с купленными товарами
		notification	= document.querySelector('.purchase__notification'),// Уведомление о покупке товара
		btnBasket		= document.querySelector('.basket'),		// Покупная корзина
		pattern			= document.querySelector('.pattern'),		// Затемняющая область заднего фона
		canel			= document.querySelector('.canel'),			// Кнопка выхода из корзины
		listItem		= document.querySelector('.list-buy-items'),// Список купленных товаров
		YDBAG			= document.querySelector('.YDBAG'),			// Предупреждающая строка в крозине
		btnCanelItem,
		price 			= document.querySelectorAll('.price'),
		itemPrices		= 0,
		sumPurchases	= document.querySelector('.sumPurchases');

	// Активация  деактивация строки поиска
	btnSearch.addEventListener('click', function() {

		// Если поисковая строка активна - при клики спрятать её
		if (repl) {
			searchArea.style.cssText = 'width: 0;';

			// - Новое состояние строки - свёрнута //
			repl = false;	
		} else {	

			// Иначе - развернуть её
			searchArea.style.cssText = 'width: 200px; margin-right: 0;';

			// - Новое состояние строки - развёрнута //
			repl = true;	
		}
		
	});

	sumPurchases.textContent = 'Amount: ' + itemPrices;

	price.forEach(function(item) {
		console.log(item.dataset.price);
		item.textContent = item.dataset.price + '$';
	});



	/*
	/ Покупка товара с заданным индексом (id)
   */

	// Перебор массива кнопок покупки
	btnBuy.forEach(function(item, i) { 
		item.addEventListener('click', function(e) {

		// Удаляем предупреждающие сообщение при покупке
		YDBAG.remove(); 

		// Какой товар был куплен
		let target = e.target;

		// Если товар куплен
		var check =	0;

		purchases.forEach(function(item) {
			if (item !== target.id) {check++;}
		});

			if (purchases.length === check) {		// - Если товар уже куплен проверка не пройдёт

				purchases.push(target.id);			// - Добавляем его в массив купленных товаров
				buyItem++;							// - Обновляем кол-во покупок
				counter.textContent = buyItem;		// - Обновляем счётчик покупок

				// Добавляем товар в корзину покупок
				listItem.innerHTML += ( `<li class = "buyItem-${i}"> ${item.dataset.items} <div class = "Bought-Item-canel"><button class="canel-item-btn"><i class="fas fa-times canel-item"></i></button></div></li>`);

				// Если товар куплен - добавить счётчик покупок
				counter.classList.remove('hidden');

				// Уведомление о покупке
				notification.style.right = '0';
				notification.textContent = (`You bought (${item.dataset.items})`);

				// Через 1.5s убрать уведомление о покупке
				setTimeout(function() {
					notification.style.right = '-325px';
				}, 1500);

				// Обновляем сумму покупки


				// Если 1-го элеммента массива нету - прячем счётчик покупок
				if (buyItem === 0) {
					counter.classList.add('hidden');
				}
			}
		 });
	});



	// Вход в корзину по клику
	btnBasket.addEventListener('click', function() { 
		pattern.style.cssText = 'z-index:1000; opacity: 1; ';
	});


	// Выход из корзины по клику
	canel.addEventListener('click', function() {
		pattern.style.cssText = 'z-index: -1000; opacity: 0';
	});
});