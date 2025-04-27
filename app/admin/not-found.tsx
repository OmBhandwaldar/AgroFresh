import Link from 'next/link';
export default function AdminNotFound() {
    return (
      <div className="p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Admin Page Not Found</h1>
        <p className="text-gray-600">The admin page you are looking for doesn’t exist.</p>
        <Link href="/admin" className="mt-4 inline-block text-blue-600 hover:underline">Go back to Admin</Link>
      </div>
    );
  }