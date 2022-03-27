import AsynchronousAutocomplete, {
  AsynchronousAutocompleteProps,
} from '@/components/AsynchronousAutocomplete';
import { Field, FormikErrors, FormikTouched, useFormikContext } from 'formik';

interface Props<T, F> extends AsynchronousAutocompleteProps<T> {
  name: string;
  defaultValue: T | T[];
  wasTouched: (touched: FormikTouched<F>) => boolean;
  errorMessage: (errors: FormikErrors<F>) => string | undefined;
  valueSelected?: (values: F) => T | T[];
}

export default function FieldAsynchronousAutocomplete<T, F>({
  name,
  defaultValue,
  wasTouched,
  errorMessage,
  valueSelected,
  ...rest
}: Props<T, F>) {
  const {
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    isSubmitting,
    values,
  } = useFormikContext<F>();

  let selectedValue = null;
  if (valueSelected) {
    selectedValue = valueSelected(values);
  }

  return (
    <Field
      component={AsynchronousAutocomplete}
      name={name}
      onChange={(_: React.ChangeEvent<HTMLInputElement>, value: T) =>
        setFieldValue(name, value || defaultValue)
      }
      onBlur={() => {
        setFieldTouched(name, true, true);
      }}
      error={wasTouched(touched) && errorMessage(errors)}
      helperText={wasTouched(touched) && errorMessage(errors)}
      disabled={isSubmitting}
      selected={selectedValue}
      {...rest}
    />
  );
}
