import { ReactNode, useEffect } from "react";
import "./Page.css";

interface PageProps {
  title: string;
  children: ReactNode;
}

function Page({ children, title }: PageProps) {
  useEffect(() => {
    document.title = `${title} | Rack x Ruin`;
  }, [title]);

  return <div className="Page">{children}</div>;
}

export default Page;
