import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type CardProps<T extends ElementType = "article"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Card<T extends ElementType = "article">({
  as,
  children,
  className,
  ...rest
}: CardProps<T>) {
  const As = (as ?? "article") as ElementType;
  return (
    <As
      className={[
        "rounded border-2 border-accent/30 p-4 bg-fg/0",
        "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent/60",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </As>
  );
}
