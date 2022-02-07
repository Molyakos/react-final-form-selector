# React final form selector

Selector for react-final-form.

## Installation

```
$ npm install react-final-form-selector
```

or

```
$ yarn add react-final-form-selector
```

## Usage

Now you can use selector like redux selector (reselect is a plus).

Interface:

```typescript
interface User {
  id: nuber;
  name: string;
}

interface Form {
  users: User[];
}
````

Component:

```typescript
export { useFormSelector } from 'react-final-form-selector';
import { FormState } from 'final-form';
import selector from './selector';

interface Props {
  idx: number;
}

const Component: React.FC<IProps> = (props) => {
  const { user } = useFormSelector((state: FormState<Form>) => selector(state, props));

  return (
    <p>{user.name}</p>
  );
};
```

Selector:

```typescript
import { createSelector } from 'reselect'; // optional  

const getUser = (state: FormState<Form>, { idx }: { idx: number; }) => state.values.users[idx];

export default createSelector([getUser], (user) => ({
  user,
}));
```
