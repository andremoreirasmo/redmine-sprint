import CircularProgress from '@material-ui/core/CircularProgress';
import MuiTextField from '@material-ui/core/TextField';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import { Field } from 'formik';
import { useEffect, useState } from 'react';

interface AsynchronousAutocompleteProps<T> {
  error: boolean;
  helperText: string | undefined;
  label: string;
  refresh: boolean;
  options: T[];
  selected?: T;
  isLoading: boolean;
  fetchData: () => Promise<void>;
  [x: string]: unknown;
}

export default function AsynchronousAutocomplete<T>({
  error,
  helperText,
  label,
  refresh,
  options,
  fetchData,
  selected,
  isLoading,
  ...rest
}: AsynchronousAutocompleteProps<T>) {
  const [open, setOpen] = useState(false);
  const [canFetchData, setCanFetchData] = useState(true);
  const loading = open && (options.length === 0 || refresh) && canFetchData;

  const dataIsLoading = () => loading || isLoading;

  useEffect(() => {
    if (!loading || isLoading) {
      return undefined;
    }

    setCanFetchData(false);

    (async () => {
      await fetchData();
    })();
  }, [fetchData, isLoading, loading]);

  return (
    <Field
      component={Autocomplete}
      options={options}
      {...rest}
      loading={dataIsLoading()}
      open={open}
      onOpen={() => {
        setCanFetchData(true);
        setOpen(true);
      }}
      onClose={() => {
        setCanFetchData(true);
        setOpen(false);
      }}
      value={selected}
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
                {dataIsLoading() ? (
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
