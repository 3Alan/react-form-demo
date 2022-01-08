import React, { FormEvent } from 'react';
import FormStore from './FormStore';

export const FormStoreContext = React.createContext({});

export interface StoreData {
  [fieldName: string]: any;
}

interface FormProps {
  store: FormStore;
  onSubmit: (values: StoreData) => void;
}

export default class Form extends React.Component<FormProps> {
  onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const { onSubmit, store } = this.props;
    e.preventDefault();
    e.stopPropagation();
    store.validate();
    onSubmit(store.getValue());
  };

  render() {
    const { store, children } = this.props;
    return (
      <FormStoreContext.Provider value={store}>
        <form onSubmit={this.onSubmit}>{children}</form>
      </FormStoreContext.Provider>
    );
  }
}
