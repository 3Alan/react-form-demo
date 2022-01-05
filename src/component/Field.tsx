import React from 'react';
import { FormStoreContext } from './Form';

interface FieldProps {
  label?: string;
  name: string;
}

interface FieldState {
  value: any;
  errorMessage: string;
}

export default class Field extends React.Component<FieldProps, FieldState> {
  static contextType = FormStoreContext;

  constructor(props: FieldProps) {
    super(props);

    console.log(this.context);

    this.state = {
      value: '',
      errorMessage: ''
    };
  }

  componentDidMount() {
    const { name } = this.props;
    console.log(this.context);
    this.setState({
      value: name && this.context ? this.context.getFiledValue(name) : undefined,
      // errorMessage: name && this.context ? this.context.error(name) : undefined
      errorMessage: ''
    });
  }

  onChange = (e: any) => {
    const { name } = this.props;
    this.context.setFiledValue(name, e.target.value);
  };

  componentDidUpdate() {}

  render() {
    const { label, name, children } = this.props;
    const childProps = {
      value: this.state.value,
      onChange: this.onChange
    };

    let cloneChildren = children;

    // @ts-ignore
    cloneChildren = React.cloneElement(cloneChildren, childProps);

    return (
      <div>
        <label htmlFor="">{label}</label>
        <div>{cloneChildren}</div>
      </div>
    );
  }
}
