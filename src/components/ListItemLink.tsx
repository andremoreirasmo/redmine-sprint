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
}

export default function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to, classNameItem, classNameIcon } = props;

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
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}