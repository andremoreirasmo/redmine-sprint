interface Props {
  test: boolean;
  children: JSX.Element;
}

export default function If(props: Props) {
  if (props.test) {
    return props.children;
  } else {
    return null;
  }
}
