import { Drawer, TSource } from '../../../types/index';
import './sources.css';

class Sources extends Drawer<TSource> {
    draw(data: Array<TSource>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp instanceof HTMLTemplateElement) {
                const sourceClone = <DocumentFragment>sourceItemTemp.content.cloneNode(true);

                const sourceName = <HTMLElement>sourceClone.querySelector('.source__item-name');
                sourceName.textContent = item.name;
                const sourceItem = <HTMLElement>sourceClone.querySelector('.source__item');
                sourceItem.setAttribute('data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });

        const container = <HTMLDivElement>document.querySelector('.sources');
        container.append(fragment);
    }
}

export default Sources;
