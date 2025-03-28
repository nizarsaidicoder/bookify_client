import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { toast } from "sonner";
import { sign_up } from "@/api/auth";
import { SignUpData } from "@types";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data.password.toString().length);
    if (data.password.toString().length < 8) {
      toast("Password must be at least 8 characters long");
      return;
    }

    if (data.password.toString() !== data.passwordConfirmation.toString()) {
      toast("Passwords do not match");
      return;
    }
    const signupData: SignUpData = {
      email: String(data.email),
      username: String(data.username),
      password: String(data.password),
    };

    try {
      await sign_up(signupData);
      toast("Account created successfully");
      form.reset();
    } catch (err: unknown) {
      toast("Error creating account", {
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
            onSubmit={handleSignup}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <p className=" font-bold text-2xl text-center ">
                  Create a new account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="passwordConfirmation">
                  Password Confirmation
                </Label>
                <Input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer">
                Create
              </Button>

              <div className="text-center text-sm">
                Already have an account ?{" "}
                <Link
                  to={"/signin"}
                  className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
