import { deepClone } from '../utils';

export default class FormStore {
  value: any;
  defaultValue;
  rules: any;
  listeners: any[] = [];
  errors: any = {};

  constructor({ defaultValue = {}, rules = {} }) {
    this.value = defaultValue;

    this.defaultValue = deepClone(defaultValue);

    this.rules = rules;
  }

  public subscribe(listener: any) {
    this.listeners.push(listener);

    return () => {
      const index = this.listeners.findIndex(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public notify(filedName: string) {
    this.listeners.forEach(listener => {
      listener(filedName);
    });
  }

  public getFieldValue(filedName: string) {
    return this.value[filedName] || '';
  }

  public getValue() {
    return this.value;
  }

  public setFieldsValue(fields: { [propsName: string]: any }) {
    Object.keys(fields).forEach(fieldName => {
      this.value[fieldName] = fields[fieldName];
      delete this.errors[fieldName];

      this.notify(fieldName);
    });
  }

  public resetFieldsValue() {
    this.errors = {};

    this.value = deepClone(this.defaultValue);

    this.notify('*');
  }

  getError(name: string) {
    if (name === undefined) return this.errors;

    if (typeof name === 'number') {
      name = Object.keys(this.errors)[name];
    }

    return this.errors[name];
  }

  setError(name: string, value: any) {
    if (value === undefined) {
      delete this.errors[name];
    } else {
      this.errors[name] = value;
    }
  }

  public validate(fieldName?: string) {
    if (fieldName === undefined) {
      Object.keys(this.rules).forEach(name => {
        this.validate(name);
      });
    } else {
      const validator = this.rules[fieldName];

      const fieldValue = this.getFieldValue(fieldName);
      const [pass, errorMessage] = validator ? validator(fieldValue, this.value) : [true, ''];

      let error;

      if (!pass) {
        this.setError(fieldName, errorMessage);
        error = new Error(errorMessage);
      }

      this.notify(fieldName);

      return [error, fieldValue];
    }
  }
}
