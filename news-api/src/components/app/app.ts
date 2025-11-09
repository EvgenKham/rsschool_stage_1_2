import { IResponseNews, IResponceSources } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources = <HTMLDivElement>document.querySelector('.sources');
        sources.addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: IResponseNews) => this.view.drawNews(data))
        );
        this.controller.getSources((data: IResponceSources) => this.view.drawSources(data));
    }

    openSources() {
        const openBtn = <HTMLDivElement>document.querySelector('.btn');
        const sources = <HTMLDivElement>document.querySelector('.sources');
        openBtn.addEventListener('click', (e: MouseEvent) => {
            sources.classList.toggle('sources_open');
        });
    }

    closeSources() {
        const sources = <HTMLDivElement>document.querySelector('.sources');
        sources.addEventListener('click', (e: MouseEvent) => {
            const target = <HTMLElement>e.target;
            if (target.closest('.source__item')) {
                sources.classList.remove('sources_open');
            }
        });
    }
}

export default App;
