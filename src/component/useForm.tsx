import { useRef } from 'react';
import FormStore from './FormStore';

const useForm = ({ defaultValue = {}, rules = {} }): [FormStore] => {
  const formRef = useRef<FormStore>(new FormStore({ defaultValue, rules }));

  return [formRef.current];
};

export default useForm;
