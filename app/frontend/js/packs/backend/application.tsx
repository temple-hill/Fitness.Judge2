import * as React from 'react';
import reactRender from '../../lib/reactRender';

import Test from '../../components/backend/Test';

const renders: {
  [key: string]: JSX.Element;
} = {
  'react-test': <Test />,
};

reactRender(renders);
