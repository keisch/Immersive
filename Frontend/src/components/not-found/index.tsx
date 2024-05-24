function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 pb-10">
        The page you are looking for does not exist.
      </p>
      <img
        className="max-h-64 max-w-64 "
        src="/images/errorC.png"
        alt="Error Image"
      />
    </div>
  );
}

export default NotFound;
