import { Avatar } from '@material-ui/core';
import { DivAvatar } from './styles';

interface Props {
  label: string;
  src: string;
}

export default function OptionAutompleteAvatar({ label, src }: Props) {
  return (
    <DivAvatar>
      <Avatar src={src} />
      <span>{label}</span>
    </DivAvatar>
  );
}
