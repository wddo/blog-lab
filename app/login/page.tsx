import Button from "@/components/ui/button";
import { signInWithEmail } from "@/lib/auth/actions";

function LoginPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <form className="space-y-4" action={signInWithEmail}>
        <div className="flex gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue="tester@labs.com"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default LoginPage;
