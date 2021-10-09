import { useMemo, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  showText?: boolean;
  className?: string;
  selected?: boolean;
}

const defaultProps = {
  showText: true,
  selected: false,
};

export default function ListItemLink(props: ListItemLinkProps) {
  props = { ...defaultProps, ...props };
  const { icon, primary, to, showText, className, selected } = props;

  const renderLink = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(function Render(
        itemProps,
        ref,
      ) {
        return <Link to={to} ref={ref} {...itemProps} />;
      }),
    [to],
  );

  return (
    <li className={className}>
      <ListItem
        button
        component={renderLink}
        className="item"
        selected={selected}
      >
        {icon ? <ListItemIcon className="icon">{icon}</ListItemIcon> : null}
        {showText ? <ListItemText primary={primary} /> : null}
      </ListItem>
    </li>
  );
}
