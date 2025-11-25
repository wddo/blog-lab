import Button from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth.actions";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

type HeaderProps = {
  user: User | null;
};

async function Header({ user }: HeaderProps) {
  const isLoggedIn = user ? true : false;

  return (
    <header className="flex justify-end gap-4">
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
