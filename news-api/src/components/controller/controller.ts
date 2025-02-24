import { IResponceSources, IResponseNews } from '../../types/index';
import AppLoader from './appLoader';
type TCallback<T> = (data: T) => void;

class AppController extends AppLoader {
    getSources(callback: (data: IResponceSources) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            (data) => callback(data)
        );
    }

    getNews(e: MouseEvent, callback: (data: IResponseNews) => void): void {
        let target = <HTMLElement>e.target;
        const newsContainer = <HTMLElement>e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        (data) => callback(data)
                    );
                }
                return;
            }
            target = <HTMLElement>target.parentNode;
        }
    }
}

export default AppController;
