export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8 sm:p-20">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Build Something <span className="text-primary-600">Exceptional</span>
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed">
          This is a robust starting point using Next.js App Router and Tailwind CSS. It is configured for strict TypeScript, responsive design, and scalable architecture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button className="px-8 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-500 transition-colors shadow-sm">
            Get Started
          </button>
          <button className="px-8 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors shadow-sm">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
}