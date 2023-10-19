import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { login } from "@/queryFns/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const loginSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(8, {
      message: "Must be at least 8 characters long",
    })
    .max(20, {
      message: "Must be 20 or fewer characters long",
    })
    .default(""),
  remember: z.boolean().default(true).optional(),
});

type Credentials = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: (credentials: Credentials) => loginUser(credentials),
    onSuccess: () => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete("showLogin");
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
      router.refresh();
    },
  });

  const loginUser = async (credentials: Credentials) => {
    await login(credentials.email, credentials.password);
  };

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values;
    mutate({ email, password });
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          type="button"
                          className="flex items-center gap-x-2 cursor-not-allowed"
                        >
                          <FormControl>
                            <Checkbox
                              className="!mt-0 cursor-not-allowed"
                              checked={true}
                            />
                          </FormControl>
                          <FormLabel className="order-last ">
                            Remember me
                          </FormLabel>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#141414] text-white">
                          <p>This feature is work in progress :P</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <FormMessage />
                  {isError && error instanceof AxiosError && (
                    <FormMessage>{error.response?.data.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <Button disabled={isLoading} className="mt-3 w-full" type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="grid">
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
