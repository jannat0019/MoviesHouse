import { useRouter } from 'next/router';

const helpContent = {
  '': <div><h1>Help Center</h1><p>Welcome to our help center.</p></div>,
  'faqs': <div><h1>FAQs</h1><p>Frequently asked questions...</p></div>,
  'contact': <div><h1>Contact Us</h1><p>Email us at support@example.com</p></div>,
  'privacy': <div><h1>Privacy Policy</h1><p>Our privacy policy details...</p></div>,
};

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;
  const path = slug ? slug.join('/') : '';

  return (
    <div>
      {helpContent[path] || <div><h1>Help Section Not Found</h1><p>The requested help section does not exist.</p></div>}
    </div>
  );
}