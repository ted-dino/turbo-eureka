"use client";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/queryFns/user";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const registerSchema = z
  .object({
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
    confirmPassword: z
      .string()
      .min(8, {
        message: "Must be at least 8 characters long",
      })
      .max(20, {
        message: "Must be 20 or fewer characters long",
      })
      .default(""),
    terms: z.literal(true, {
      errorMap: () => ({
        message: "You must accept the terms and conditions",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export default function RegisterForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });
  const { mutate, isLoading, error } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: (variables: {
      email: string;
      password: string;
      confirmPassword: string;
    }) =>
      createAccount(
        variables.email,
        variables.password,
        variables.confirmPassword,
      ),
    onSuccess: () => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete("showLogin");
      const search = current.toString();
      router.refresh();
      router.push(`${pathname}?${search}`);
    },
  });

  const createAccount = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    const response = await register(email, password, confirmPassword);
    return response;
  };

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    const { email, password, confirmPassword } = values;
    mutate({ email, password, confirmPassword });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Get started with the app, just create an account and enjoy the
          experience.
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
                  {error instanceof Error && (
                    <FormMessage>
                      Email is already taken. Please try again.
                    </FormMessage>
                  )}
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="*********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="">
                  <div className="flex items-center gap-x-2">
                    <FormControl>
                      <Checkbox
                        className="!mt-0"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="order-last">
                      Accept terms and conditions
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-3 w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="grid">
        <TabsList className="bg-transparent">
          <p className="text-sm flex items-center">
            Already have an account?
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-inherit"
            >
              <strong className="hover:underline">Login</strong>
            </TabsTrigger>
          </p>
        </TabsList>
      </CardFooter>
    </Card>
  );
}
