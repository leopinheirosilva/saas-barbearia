export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  // Page container component
  return <div className="space-y-6 p-5">{children}</div>;
};

export const PageSectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Page section title component
  return (
    <h2 className="text-foreground text-xs font-bold uppercase">{children}</h2>
  );
};

export const PageSection = ({ children }: { children: React.ReactNode }) => {
  // Page section component
  return <div className="space-y-3">{children}</div>;
};

export const PageSectionScroller = ({ children }: { children: React.ReactNode }) => {
  // Page section scroller component
  return <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">{children}</div>;
};