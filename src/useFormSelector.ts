import type { FormApi, FormState, FormSubscription } from 'final-form';
import { formSubscriptionItems } from 'final-form';
import { useEffect, useRef, useState } from 'react';
import { useForm, UseFormStateParams } from 'react-final-form';

const refEquality = (left: unknown, right: unknown) => left === right;

const all: FormSubscription = formSubscriptionItems.reduce(
  (result: { [key: string]: boolean }, key) => ({ ...result, [key]: true }),
  {}
);

function useFormSelector<FormValues, TSelected>(
  selector: (state: FormState<FormValues>) => TSelected,
  equalityFn: (left: TSelected, right: TSelected) => boolean = refEquality,
  { subscription = all }: UseFormStateParams<FormValues> = {}
): TSelected {
  const form: FormApi<FormValues> = useForm<FormValues>('useFormState');
  const latestSelectedState = useRef<TSelected>();

  // synchronously register and unregister to query field state for our subscription on first render
  const [state, setState] = useState<TSelected>((): TSelected => {
    let initialState = {} as FormState<FormValues>;

    form.subscribe((state) => {
      initialState = state;
    }, subscription)();

    const newSelectedState = selector(initialState);

    latestSelectedState.current = newSelectedState;

    return newSelectedState;
  });

  useEffect(() => {
    const unsubscribe = form.subscribe((newState) => {
      const newSelectedState = selector(newState);

      // ensure latest selected state is reused so that a custom equality function can result in identical references
      if (!equalityFn(newSelectedState, latestSelectedState.current!)) {
        setState(newSelectedState);
        latestSelectedState.current = newSelectedState;
      }
    }, subscription);

    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}

export { useFormSelector };
