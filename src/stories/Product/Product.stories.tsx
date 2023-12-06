import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Product, Props } from '../../features/ProductsList/ui/Product/Product';
import { ReduxProviderDecorator } from '../decorators';
import { Provider } from 'react-redux';
import { store } from '../../app/model/store';

export default {
    title: 'Components/Product',
    component: Product,
    decorators: [ReduxProviderDecorator],
} as Meta;

const Template: Story<Props> = (args) => (
    <Provider store={store}>
        <Product {...args} />
    </Provider>
);

export const ProductExample = Template.bind({});
ProductExample.args = {
    item: {
        id: '1',
        title: 'Example Product',
        photo: 'https://img.freepik.com/free-photo/a-cupcake-with-a-strawberry-on-top-and-a-strawberry-on-the-top_1340-35087.jpg',
        description: 'Lorem ipsum dolor sit amet.',
        price: 100,
    },
};
