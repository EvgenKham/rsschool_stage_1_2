import './news.css';
import { INews } from '../../../types/index';

class News {
    draw(data: Array<INews>) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp instanceof HTMLTemplateElement) {
                const newsClone = <DocumentFragment>newsItemTemp.content.cloneNode(true);

                if (idx % 2) {
                    const newsElement = <HTMLElement>newsClone.querySelector('.news__item');
                    newsElement.classList.add('alt');
                }

                const newsPhoto = <HTMLElement>newsClone.querySelector('.news__meta-photo');
                newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

                const newsAuthor = <HTMLElement>newsClone.querySelector('.news__meta-author');
                newsAuthor.textContent = item.author || item.source.name;

                const newsDate = <HTMLElement>newsClone.querySelector('.news__meta-date');
                newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

                const newsTitle = <HTMLElement>newsClone.querySelector('.news__description-title');
                newsTitle.textContent = item.title;

                const newsSource = <HTMLElement>newsClone.querySelector('.news__description-source');
                newsSource.textContent = item.source.name;

                const newsContent = <HTMLElement>newsClone.querySelector('.news__description-content');
                newsContent.textContent = item.description;

                const newsReadMore = <HTMLElement>newsClone.querySelector('.news__read-more a');
                newsReadMore.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });

        const container = <HTMLDivElement>document.querySelector('.news');
        container.innerHTML = '';
        container.appendChild(fragment);
    }
}

export default News;
