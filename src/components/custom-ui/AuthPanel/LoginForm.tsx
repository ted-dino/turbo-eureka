import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>
          By logging in you agree to the ridiculously long terms that you didnt
          bother to read
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <label htmlFor="username">Username</label>
          <Input id="username" placeholder="Pablo Picasso" />
        </div>
        <div className="space-y-1">
          <label htmlFor="password">Password</label>
          <Input type="password" id="password" placeholder="*********" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
      </CardContent>
      <CardFooter className="grid">
        <Button>Submit</Button>
        <TabsList className="bg-inherit">
          <p className="text-sm flex items-center">
            Dont have an account?
            <TabsTrigger value="register">
              <strong>Sign up</strong>
            </TabsTrigger>
          </p>
        </TabsList>
      </CardFooter>
    </Card>
  );
}
