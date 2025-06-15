import TabBar from "@/components/tabbar";
import { PropsWithChildren } from "react";

const TabsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
};

export default TabsLayout;
