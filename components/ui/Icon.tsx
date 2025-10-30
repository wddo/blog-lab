type IconName = "heart" | "share" | "user";

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  solid?: boolean;
  title?: string; // aria-hidden 속성 값을 결정하는 데 사용
  ariaHidden?: boolean;
}

const icons = {
  heart: ({ solid }: { solid?: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={solid ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
    </svg>
  ),
  share: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
      />
    </svg>
  ),
  user: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 1.5c-3.771 0-6.75 2.479-6.75 5.25V21h13.5v-2.25c0-2.771-2.979-5.25-6.75-5.25Z" />
    </svg>
  ),
} as const;

export default function Icon({
  name,
  size = 20,
  className,
  solid,
  title,
  ariaHidden = !title,
}: IconProps) {
  const Svg = icons[name];
  return (
    <span
      role={title ? "img" : undefined}
      aria-hidden={ariaHidden}
      title={title}
      style={{ width: size, height: size, display: "inline-flex" }}
      className={className}
    >
      <Svg solid={solid} />
    </span>
  );
}
