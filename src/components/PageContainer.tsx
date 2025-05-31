import type React from "react";

interface ChildrenProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <div className="px-4 md:px-10 lg:px-32">{children}</div>
    </>
  );
};

export default PageContainer;
