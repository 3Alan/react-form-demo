import { deepClone } from './utils';

export default class FormStore {
  value: any;
  defaultValue;
  rules: any;
  listeners: any[] = [];
  errors: any = {};

  constructor(defaultValue = {}, rules = {}) {
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

  public getFiledValue(filedName: string) {
    return this.value[filedName];
  }

  public getValue() {
    return this.value;
  }

  public setFiledValue(fieldName: string, fieldValue: any) {
    this.value[fieldName] = fieldValue;

    this.validate(fieldName);

    this.notify(fieldName);
  }

  public resetFiledValue() {
    this.errors = {};

    this.value = deepClone(this.defaultValue);

    this.notify('*');
  }

  error(name: string, value: any) {
    const args = arguments;
    // 如果没有传入参数，则返回错误信息中的第一条
    // const errors = store.error()
    if (args.length === 0) return this.errors;

    // 如果传入的name是number类型，返回第i条错误信息
    // const error = store.error(0)
    if (typeof name === 'number') {
      name = Object.keys(this.errors)[name];
    }

    // 如果传了value，则根据value值设置或删除name对应的错误信息
    if (args.length === 2) {
      if (value === undefined) {
        delete this.errors[name];
      } else {
        this.errors[name] = value;
      }
    }

    // 返回错误信息
    return this.errors[name];
  }

  public validate(fieldName: string) {
    if (fieldName === undefined) {
      Object.keys(this.rules).forEach(item => {});
    }

    const validator = this.rules[fieldName];
    const fieldValue = this.getFiledValue(fieldName);
    const result = validator ? validator(fieldValue, this.value) : true;

    const message = this.error(fieldName, result === true ? undefined : result || '');
    const error = message === undefined ? undefined : new Error(message);

    return [error, fieldValue];
  }
}
