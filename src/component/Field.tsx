import React from 'react';
import { FormStoreContext } from './Form';

interface FieldProps {
  label?: string;
  name: string;
  type?: 'string' | 'number';
}

interface FieldState {
  value: any;
  errorMessage: string;
}

export default class Field extends React.Component<FieldProps, FieldState> {
  static contextType = FormStoreContext;

  unSubscribeStore: any;

  static defaultProps = {
    type: 'string'
  };

  constructor(props: FieldProps) {
    super(props);

    this.state = {
      value: '',
      errorMessage: ''
    };
  }

  componentDidMount() {
    const { name } = this.props;
    const value = this.context ? this.context.getFiledValue(name) : '';

    this.setState({
      value: this.formatValue(value),
      errorMessage: this.context ? this.context.getError(name) : ''
    });

    this.subscribeFormStore();
  }

  componentWillUnmount() {
    this.unSubscribeStore();
  }

  componentDidUpdate() {
    console.log('reRender----', this.props.name);
  }

  subscribeFormStore() {
    const { name } = this.props;

    this.unSubscribeStore = this.context.subscribe((fieldName: string) => {
      const value = this.context ? this.context.getFiledValue(name) : '';
      if (fieldName === name || fieldName === '*') {
        console.log(this.context.getError());

        this.setState({
          value: this.formatValue(value),
          errorMessage: this.context.getError(name)
        });
      }
    });
  }

  formatValue(value: any) {
    const { type } = this.props;
    if (type === 'number') {
      return value ? Number(value) : value;
    }

    return value;
  }

  onChange = (e: any) => {
    const { name, type } = this.props;

    if (type === 'number') {
      this.context.setFiledValue(name, e.target.valueAsNumber);
      return;
    }

    this.context.setFiledValue(name, e.target.value);
  };

  render() {
    const { label, children } = this.props;
    const { value, errorMessage } = this.state;

    const childProps = {
      validateFailed: !!errorMessage,
      value,
      onChange: this.onChange
    };

    // @ts-ignore
    const cloneChildren = React.cloneElement(children, childProps);

    return (
      <div>
        <label htmlFor="">{label}</label>
        <div>{cloneChildren}</div>
        <div style={{ color: 'red' }}>{errorMessage}</div>
      </div>
    );
  }
}
