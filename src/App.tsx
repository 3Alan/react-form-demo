import { useRef } from 'react';
import Form from './component/Form';
import FormStore from './component/FormStore';
import Field from './component/Field';

function App() {
  const store = useRef(new FormStore());

  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = store.current.getValue();
    console.log(data);

    // ...
  };

  return (
    <div className="App">
      <Form store={store.current} onSubmit={onSubmit}>
        <Field name="username">
          <input />
        </Field>
        <Field name="password">
          <input type="password" />
        </Field>
        <button>Submit</button>
      </Form>
    </div>
  );
}

export default App;
