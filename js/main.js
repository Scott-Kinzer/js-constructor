// new Swiper('.swiper-container', {
// 	loop: true,
// 	navigation: {
// 		nextEl: '.arrow',
// 	},
// 	breakpoints: {
// 		320: {
// 			slidesPerView: 1,
// 			spaceBetween: 20
// 		},
// 		541: {
// 			slidesPerView: 2,
// 			spaceBetween: 40
// 		}
// 	}
// });

// const menuButton = document.querySelector('.menu-button');
// const menu = document.querySelector('.header');
// menuButton.addEventListener('click', function () {
// 	menuButton.classList.toggle('menu-button-active');
// 	menu.classList.toggle('header-active');
// })

const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);
	if (classNames) {
		element.classList.add(...classNames);
	}

	if (attributes) {
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute];
		}
	}

	return element;
};

const createHeader = ({
	title,
	header: {
		logo,
		menu,
		social
	}
}) => {
	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header'])

	if (logo) {
		const logoElem = getElement('img', ['logo'], {
			src: logo,
			alt: 'Логотип' + title
		});

		wrapper.append(logoElem);
	}

	if (menu) {
		const navigation = getElement('nav', ['menu-list']);

		const allMenu = menu.map(item => {
			const menuLink = getElement('a', ['menu-link']);

			menuLink.href = item.link;
			menuLink.textContent = item.title;

			return menuLink;
		});

		navigation.append(...allMenu);
		wrapper.append(navigation);

		const menuBtn = getElement('button', ['menu-button']);
		menuBtn.addEventListener('click', () => {
			menuBtn.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		});

		container.append(menuBtn);
	}

	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map(item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title
			}));

			socialLink.href = item.link;

			return socialLink;
		});


		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}





	header.append(container);
	container.append(wrapper);
	return header;
};

const createMain = ({
	title,
	main: {
		genre,
		rating,
		description,
		trailer,
		slider
	}
}) => {

	const main = getElement('main');
	const container = getElement('div', ['container']);
	main.append(container);
	const wrapper = getElement('div', ['main-content']);
	container.append(wrapper);
	const content = getElement('div', ['content']);
	wrapper.append(content);

	if (genre) {
		const genreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'], {
			textContent: genre
		});
		content.append(genreSpan);
	};


	if (rating) {
		const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div', ['rating-stars']);
		const ratingNumber = getElement('div', ['rating-number'], {
			textContent: `${rating}/10`
		});

		for (let i = 0; i < 10; i++) {
			const star = getElement('img', ['star'], {
				alt: i ? `` : `Rating ${rating} from 10`,
				src: i < rating ? `img/star.svg` : `img/star-o.svg`
			});
			ratingStars.append(star);
		}
		ratingBlock.append(ratingStars, ratingNumber);


		content.append(ratingBlock);
	}

	content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
		textContent: title
	}));

	if (description) {
		const descriptionElem = getElement('p', ['main-description', 'animated', 'fadeInRight'], {
			textContent: description
		});

		content.append(descriptionElem);
	}

	if (trailer) {
		const youtubeLink = getElement('a', ['button', 'animated', 'fadeInRight', 'youtube-modal'], {
			href: trailer,
			textContent: 'Watch trailer'
		});

		const youtubeImageLink = getElement('a', ['play', 'youtube-modal'], {
			href: trailer,
		});

		const iconPlay = getElement('img', ['play-img'], {
			src: 'img/play.svg',
			alt: 'watch trailer',
		});

		content.append(youtubeLink);
		youtubeImageLink.append(iconPlay);
		wrapper.append(youtubeImageLink);
	}

	if (slider) {
		const sliderBlock = getElement('div', ['series']);
		const swiperBlock = getElement('div', ['swiper-container']);
		const swiperWrapper = getElement('div', ['swiper-wrapper']);
		const arrow = getElement('button', ['arrow']);

		const slides = slider.map((item) => {



			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: ((item.title ? item.title : '') + ' ' + (item.subtitle ? item.substring : '')).trim()
			})

			card.append(cardImage);

			if (item.title || item.subtitle) {
				const cardDescription = getElement('figcaption', ['card-description']);
				cardDescription.innerHTML = `
				${item.title ? `<p class=card-subtitle>${item.subtitle}</p>`: ''}
				${item.title ? `<p class=card-subtitle>${item.title}</p>`: ''}
				`;

				card.append(cardDescription)
			}

			swiperSlide.append(card)
			return swiperSlide;
		});

		swiperWrapper.append(...slides);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock, arrow);

		container.append(sliderBlock);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});


	}

	return main;
};

const createFooter = ({footer: {rule, links}}) => {
	
	const footer = getElement('footer', ['footer']);
	const container = getElement('div', ['container']);
	const footerContent = getElement('div', ['footer-content']);
	const left = getElement('div', ['left']);
	const spanFooter = getElement('span', ['copyright'], {
		textContent: rule
	});

	const right = getElement('div', ['right']);

	const nav = getElement('nav', ['footer-menu']);

	const footerLinks = links.map((item) => {
		
		const footerLink = getElement('a', ['footer-link'], {
			textContent: item.footerElem
		});
		
		return footerLink;
	})

	
	container.append(footerContent);
	footerContent.append(left);
	left.append(spanFooter);
	footerContent.append(right);
	nav.append(...footerLinks);
	right.append(nav);
	footer.append(container);

	return footer;

}




const movieConsctructor = (selector, options) => {

	const app = document.querySelector(selector);
	app.classList.add('body-app');

	app.style.color = options.fontColor || '';

	app.style.backgroundColor = options.backgroundColor || '';

	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index + 1);

		const favicon = getElement('link', null, {
			rel: 'icon',
			href: options.favicon,
			type: 'image' + (type === 'svg' ? 'isvg-xml' : type)

		})

		document.head.append(favicon)
	}

	app.style.backgroundImage = options.background ?
		`url("${options.background}")` : '';
	document.title = options.title;
	if (options.header) {
		app.append(createHeader(options));
	}

	if (options.main) {
		app.append(createMain(options));
	}

	if (options.footer) {
		
		app.append(createFooter(options));
	}

};

movieConsctructor('.app', {
	title: 'Vidmak',
	background: 'witcher/background.jpg',
	favicon: 'witcher/logo.png',
	fontColor: '#ffffff',
	backgroundColor: '#1412218',
	subColor: '#9D2929',
	header: {
		logo: 'witcher/logo.png',
		social: [{
				title: 'Twitter',
				link: '#',
				image: 'witcher/social/twitter.svg'
			},

			{
				title: 'Instagram',
				link: '#',
				image: 'witcher/social/instagram.svg'
			},

			{
				title: 'Facebook',
				link: '#',
				image: 'witcher/social/facebook.svg'
			},
		],
		menu: [{
				title: 'Описания',
				link: '#'
			},
			{
				title: 'Трейлер',
				link: '#'
			},
			{
				title: 'Отзывы',
				link: '#'
			}
		]
	},
	main: {
		genre: '2019, фентези',
		rating: 9,
		description: 'l;SALCM;SLMSAK;CMKSLCMKLMDMLDM',
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
		slider: [{
				img: 'witcher/series/series-1.jpg',
				title: 'Начало конца',
				subtitle: 'Серия 1',


			},
			{
				img: 'witcher/series/series-2.jpg',
				title: 'Четыре марки',
				subtitle: 'Серия 2',


			},
			{
				img: 'witcher/series/series-3.jpg',
				title: 'Предательская луна',
				subtitle: 'Серия 3',


			},
			{
				img: 'witcher/series/series-4.jpg',
				title: 'Банкеты, ублюдки и похороны',
				subtitle: 'Серия 4',


			}
		]
	},

	footer: {
		rule: "© 2020 The Witcher. All right reserved.",
		links: [
			{
				footerElem: "Privacy Policy"
			}, 
			{
				footerElem: "Terms of Service"

			}, 
			{
				footerElem: "Legal"

			}
		]
	}
});