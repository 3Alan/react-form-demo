## reference
https://zhuanlan.zhihu.com/p/57820186

https://github.com/react-component/field-form

## Example
```tsx
function App() {
  const [form] = useForm({
    defaultValue: {
      age: 10
    },
    rules: {
      age: (value: any) => [value > 10, 'age must more than 10']
    }
  });

  const onSubmit = (values: StoreData) => {
    console.log(values);
  };

  return (
    <Form store={form} onSubmit={onSubmit}>
      <Field label="username" name="username">
        <input />
      </Field>
      <Field label="age > 10" name="age" type="number">
        <input type="number" />
      </Field>
      <button type="submit">Submit</button>
    </Form>
  );
}
```

## TODO
- 嵌套数据