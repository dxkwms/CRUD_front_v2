import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div
      className="bg-local bg-cover bg-center h-screen w-full"
      style={{ backgroundImage: `url(/img/loginBackground.jpg)` }}
    >
      {children}
    </div>
  );
}
