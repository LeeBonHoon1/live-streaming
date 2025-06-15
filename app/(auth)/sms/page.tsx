"use client";

import { useActionState } from "react";
import { smsLogin } from "@/(auth)/sms/actions";
import Button from "@/components/button";
import Input from "@/components/input";

const initialState = {
  token: false,
  error: undefined,
  prevPhone: "",
};

const SMSLoginPage = () => {
  const [state, action] = useActionState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-semibold">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>

      <form className="flex flex-col gap-3" action={action}>
        {state.token ? (
          <Input
            type="number"
            name="token"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            type="text"
            name="phone"
            placeholder="Phone number"
            required
            errors={state.error?.formErrors}
          />
        )}

        <Button text={state.token ? "Verify Token" : "Send Verification SMS"} />
      </form>
    </div>
  );
};

export default SMSLoginPage;
