import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { sign_in } from "@/api/auth";
import { toast } from "sonner";
import { SignInData } from "@types";

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigator = useNavigate();
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.password.toString().length < 8)
      toast("Password must be at least 8 characters long");

    try {
      const signinData: SignInData = {
        username: String(data.username),
        password: String(data.password),
      };
      await sign_in(signinData);
      toast("Signed in successfully");
      navigator("/authors", { replace: true });
      window.location.reload();
    } catch (err: unknown) {
      toast("Error signing in", {
        description:
          err instanceof Error ? err.message : "An unknown error occurred",
      });
      console.error(err);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}>
      <Card className="overflow-hidden pr-4">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={handleSignIn}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Bookify account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer">
                Login
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to={"/signup"}
                  className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://images6.alphacoders.com/346/346199.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover  rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
