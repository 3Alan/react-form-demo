import { useRef } from 'react';
import Form from './component/Form';
import FormStore from './component/FormStore';
import Field from './component/Field';
import Input from './component/Input';

function App() {
  const store = useRef(
    new FormStore({
      defaultValue: {
        age: 10
      },
      rules: {
        age: (value: any) => [value > 10, 'age must more than 10']
      }
    })
  );

  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = store.current.getValue();
    store.current.validate();
    console.log(data);
  };

  const onReset = () => {
    store.current.resetFiledValue();
  };

  return (
    <div className="App">
      <Form store={store.current} onSubmit={onSubmit}>
        <Field label="username" name="username">
          <Input />
        </Field>
        <Field label="age > 10" name="age" type="number">
          <Input type="number" />
        </Field>
        <button>Submit</button>
      </Form>
      <button onClick={onReset}>reset</button>
    </div>
  );
}

export default App;
