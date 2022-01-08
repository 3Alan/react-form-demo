import { useState } from 'react';
import Form, { StoreData } from './component/Form';
import Field from './component/Field';
import Input from './component/Input';
import useForm from './component/useForm';

function App() {
  const [form] = useForm({
    defaultValue: {
      age: 10
    },
    rules: {
      age: (value: any) => [value > 10, 'age must more than 10']
    }
  });

  const [data, setData] = useState('');

  const onSubmit = (values: StoreData) => {
    console.log(values);
    setData(JSON.stringify(values));
  };

  const onReset = () => {
    form.resetFieldsValue();
  };

  const onSetValue = () => {
    form.setFieldsValue({
      username: 'Alan',
      age: 24
    });
  };

  return (
    <div className="App">
      <Form store={form} onSubmit={onSubmit}>
        <Field label="username" name="username">
          <Input />
        </Field>
        <Field label="age > 10" name="age" type="number">
          <Input type="number" />
        </Field>
        <button type="submit">Submit</button>
      </Form>

      <button onClick={onReset}>reset</button>
      <button onClick={onSetValue}>fill value</button>

      <div>{data}</div>
    </div>
  );
}

export default App;
