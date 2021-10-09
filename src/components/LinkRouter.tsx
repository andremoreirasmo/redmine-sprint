import Link, { LinkProps } from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

export default function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}
