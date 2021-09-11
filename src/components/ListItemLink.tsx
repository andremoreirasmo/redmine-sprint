import { useMemo, forwardRef } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  classNameItem?: string;
  classNameIcon?: string;
  showText?: Boolean;
}

const defaultProps = {
  showText: true,
}

export default function ListItemLink(props: ListItemLinkProps) {
  props = { ...defaultProps, ...props }
  const { icon, primary, to, classNameItem, classNameIcon, showText } = props;

  const renderLink = useMemo(
    () =>
      forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink} className={classNameItem}>
        {icon ? <ListItemIcon className={classNameIcon}>{icon}</ListItemIcon> : null}
        {showText ? <ListItemText primary={primary} /> : null}
      </ListItem>
    </li>
  );
}
