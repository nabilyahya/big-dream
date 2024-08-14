import Link from 'next/link';

const Home = () => (
  <div>
    <h1>Welcome to Chat Room</h1>
    <Link href="/register">
      Register
    </Link>
    <Link href="/resturant">
      Food Order Page
    </Link>
  </div>
);

export default Home;
