import { ComponentType } from "react";

export default function Base(Component: ComponentType) {
  return (
    <>
      <Component />
    </>
  );
}