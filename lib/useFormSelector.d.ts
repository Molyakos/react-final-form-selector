import type { FormState } from 'final-form';
import { UseFormStateParams } from 'react-final-form';
declare function useFormSelector<FormValues, TSelected>(selector: (state: FormState<FormValues>) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean, { subscription }?: UseFormStateParams<FormValues>): TSelected;
export { useFormSelector };
