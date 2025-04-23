import { useRouter } from 'next/router';
 

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;
  const path = slug ? slug.join('/') : '';

  return (
    <div>
     <h1>help center</h1>
    </div>
  );
}