import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/model/store';

export const ReduxProviderDecorator = (Story: any) => (
    <Provider store={store}>
        <Story />
        </Provider>
);