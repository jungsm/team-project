import React from "react";

const LoginPage2 = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  return <div>{code}</div>;
};

export default LoginPage2;
