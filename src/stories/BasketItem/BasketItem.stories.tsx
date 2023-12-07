import React from 'react';
import {Meta, Story} from '@storybook/react';
import {BasketItem, Props} from '../../features/basket/ui/Basket/BasketItem/BasketItem';
import {ReduxProviderDecorator} from '../decorators';
import {Provider} from 'react-redux';
import {store} from '../../app/model/store';

export default {
    title: 'Components/BasketItem',
    component: BasketItem,
    decorators: [ReduxProviderDecorator],
} as Meta;

const Template: Story<Props> = (args) => (
    <Provider store={store}>
        <BasketItem {...args} />
    </Provider>
);

export const BasketItemExample = Template.bind({});
BasketItemExample.args = {
    product: {
        id: '1',
        title: 'Example BasketItem',
        photo: 'https://img.freepik.com/free-photo/a-cupcake-with-a-strawberry-on-top-and-a-strawberry-on-the-top_1340-35087.jpg',
        description: 'Lorem ipsum dolor sit amet.',
        price: 100,
    },
    item: {
        id: '1',
        quantity: 2,
        price: 0
    }
};
