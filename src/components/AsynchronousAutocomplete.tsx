import { useState, useEffect } from 'react';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Field } from 'formik';
import MuiTextField from '@material-ui/core/TextField';

interface AsynchronousAutocompleteProps<T> {
  error: boolean;
  helperText: string | undefined;
  label: string;
  refresh: boolean;
  fetchData: () => Promise<T[]>;
  [x: string]: unknown;
}

export default function AsynchronousAutocomplete<T>({
  error,
  helperText,
  label,
  refresh,
  fetchData,
  ...rest
}: AsynchronousAutocompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<T[]>([]);
  const loading = open && (options.length === 0 || refresh);

  if (refresh && options.length > 0) {
    setOptions([]);
  }

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    (async () => {
      setOptions(await fetchData());
    })();
  }, [fetchData, loading]);

  return (
    <Field
      component={Autocomplete}
      options={options}
      {...rest}
      loading={loading}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <MuiTextField
          {...params}
          error={error}
          helperText={helperText}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
