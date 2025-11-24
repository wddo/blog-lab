import Button from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth.actions";
import type { User } from "@supabase/supabase-js";
import { cacheTag } from "next/cache";
import Link from "next/link";

type HeaderProps = {
  user: User | null;
};

async function getCachedTime() {
  "use cache";

  cacheTag("timestamp");

  return new Date().toLocaleString();
}

async function Header({ user }: HeaderProps) {
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
