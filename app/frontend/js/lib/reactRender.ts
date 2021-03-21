import * as React from 'react';
import * as ReactDOM from 'react-dom';

const reactRender = (renders: {[key: string]: JSX.Element}): void => {
  const getElementData = (element: HTMLElement): Record<string, unknown> => {
    const dataset = element.dataset;
    let data = {};
    if (dataset['props']) {
      data = JSON.parse(dataset['props']);
      dataset['props'] = '';
    }

    return data;
  };

  Object.keys(renders).forEach(id => {
    const element = document.getElementById(id);

    if (element) {
      const data = getElementData(element);
      const component = React.cloneElement(renders[id], { ...data });

      ReactDOM.render(component, element);
    }
  });

  Object.keys(renders).forEach(id => {
    const elements = document.getElementsByClassName(id) as HTMLCollectionOf<HTMLElement>;

    Array.from(elements).forEach(element => {
      const data = getElementData(element);
      const component = React.cloneElement(renders[id], { ...data });

      ReactDOM.render(component, element);
    });
  });
};

export default reactRender;
