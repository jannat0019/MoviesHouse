import Link from 'next/link';

export default function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/">
        <button>Go Home</button>
      </Link>
    </div>
  );
}