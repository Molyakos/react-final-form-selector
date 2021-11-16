# React final form selector

Selector for react-final-form.

## Installation

```
$ npm install react-final-form-selector
```

## Usage

Now you can use selector like redux selector (reselect is a plus).

Interface:
```typescript
interface IForm {
    rows: number[];
}
````

Component:
```typescript
export { useFormSelector } from 'react-final-form-selector';
import { FormState } from 'final-form';

interface IProps {
    idx: number;
}

const Component: React.FC<IProps> = (props) => {
    const { row } = useFormSelector((state: FormState<IForm>) => selector(state, props));
    
    ...
};
```

Selector:
```typescript
import { createSelector } from 'reselect'; // optional  

const getRow = (state: FormState<IForm>, { idx }: { idx: number; }) => state.values[idx];

export default createSelector([rowSelector], (row) => ({
    row,
}));
```
