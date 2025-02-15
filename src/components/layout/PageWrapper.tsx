const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-times min-h-screen bg-gray-50">
      {children}
    </div>
  );
};

export default PageWrapper; 