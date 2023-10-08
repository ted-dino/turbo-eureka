"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useRouter } from "next/navigation";

type Props = {
  showLogin: string | null | undefined;
};

export default function AuthPanel({ showLogin }: Props) {
  const router = useRouter();

  return (
    <Dialog open={showLogin ? true : false} onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <>
              <RegisterForm />
            </>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
