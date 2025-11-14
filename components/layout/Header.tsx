import Button from "@/components/ui/button";
import { signOut } from "@/lib/auth/actions";
import { getCachedTime } from "@/lib/blog/actions";
import { IUser } from "@/types/user";
import Link from "next/link";

interface IHeaderProps {
  user: IUser | null;
}

async function Header({ user }: IHeaderProps) {
  const isLoggedIn = user ? true : false;

  const date = await getCachedTime();

  return (
    <header className="flex gap-4">
      <p className="flex flex-1 flex-col justify-center text-sm text-gray-500">
        cached at: {date}
      </p>
      <p className="flex flex-col justify-center text-sm text-gray-500">
        {user && user?.email}
      </p>
      <div className="flex">
        <div className="ml-auto">
          {isLoggedIn ? (
            <form action={signOut}>
              <Button type="submit">Logout</Button>
            </form>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline">
                <Link href="/signup">Sign up</Link>
              </Button>
              <Button variant="primary">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
