const Spinner = () => {
  return (
    <div className="absolute left-1/2 top-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center space-x-2 bg-gray-200/60 bg-violet-600">
      <div className="h-4 w-4 animate-pulse rounded-full bg-violet-600"></div>
      <div className="h-4 w-4 animate-pulse rounded-full bg-violet-600"></div>
      <div className="h-4 w-4 animate-pulse rounded-full bg-violet-600"></div>
    </div>
  );
};

export default Spinner;
