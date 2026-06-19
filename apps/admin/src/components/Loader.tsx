const Loader = () => {
  return (
    <div className="my-60 flex items-center justify-center">
      <div
        className="text-primary mx-auto inline-block h-10 w-10 animate-spin rounded-full border-[3px] border-current border-t-transparent"
        // role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
