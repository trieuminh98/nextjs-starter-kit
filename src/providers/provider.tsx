import React, { PropsWithChildren } from "react";
import ReactQueryProvider from "./queryClient";

const Provider = ({ children }: PropsWithChildren) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default Provider;
