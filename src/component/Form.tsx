import React from 'react';

export const FormStoreContext = React.createContext(undefined);

interface FormProps {
  store: any;
  onSubmit: any;
}

export default class Form extends React.Component<FormProps> {
  render() {
    const { store, children, onSubmit } = this.props;

    return (
      <FormStoreContext.Provider value={store}>
        <form onSubmit={onSubmit}>{children}</form>
      </FormStoreContext.Provider>
    );
  }
}
