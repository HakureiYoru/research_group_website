'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">出错了</h2>
        <p className="text-gray-600 mb-8">页面加载时发生错误，请稍后重试。</p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          重新加载
        </button>
      </div>
    </div>
  );
}

