interface Props {
  label: string;
  imgUrl: string;
}

export default function Tag({ label, imgUrl }: Props) {
  return (
    <>
      <img src={imgUrl} />
      {label}
    </>
  );
}
