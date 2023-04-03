import { useDebouncedState } from '@mantine/hooks';
import { TextInput, Text, Autocomplete } from '@mantine/core';

export function DebouncedInput() {
  const [value, setValue] = useDebouncedState('', 200);

  return (
    <>
      
    </>
  );
}