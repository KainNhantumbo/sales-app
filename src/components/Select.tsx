import { useTheme } from 'styled-components';
import Select, { Props } from 'react-select';
import { selectStyles } from '@/styles/modules/select';

export default function SelectContainer({ ...props }: Props) {
  const theme = useTheme();
  return <Select styles={selectStyles(theme)} {...props} />;
}
