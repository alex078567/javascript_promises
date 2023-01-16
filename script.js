"use strict";
// Функция которая ожидает 2 секунды, 
// а потом переводит промис в состояние fulfilled

const wait = function (seconds) {
	return new Promise(function (resolve) {
		setTimeout(resolve, seconds * 1000);
	});
};

// переменная которая содержит первый элемент с классом "images" 

const imgContainer = document.querySelector(".images");

// функция которая возвращает промис, в котором происходит
// загрузка изображения. Если все прошло успешно, то происходит перевод промиса в
// состояние fulfilled , при этом возвращается элемент img. Если произошла ошибка,
// то промис переходит в состояние rejected и возвращает ошибку

const createImage = function (imgPath) {
	return new Promise(function (resolve, reject) {
		const img = document.createElement("img");
		img.src = imgPath;

		img.addEventListener("load", function () {
			imgContainer.append(img);
			resolve(img);
		});

		img.addEventListener("error", function () {
			reject(new Error("Image not found"));
		});
	});
};

// переменная необходима чтобы обеспечить смену изображений

let currentImg;

// цепочка промисов, в которой происходит смена изображений на экране

createImage("img/img-1.jpg")
	.then((img) => {
		currentImg = img;
		console.log("Image 1 loaded");
		return wait(2);
	})
	.then(() => {
		currentImg.style.display = "none";
		return createImage("img/img-2.jpg");
	})
	.then((img) => {
		currentImg = img;
		console.log("Image 2 loaded");
		return wait(2);
	})
	.then(() => {
		currentImg.style.display = "none";
		return createImage("img/img-3.jpg");
	})
	.then((img) => {
		currentImg = img;
		console.log("Image 3 loaded");
		return wait(2);
	})
	.then(() => {
		currentImg.style.display = "none";
	})
	.catch((err) => console.error(err));

