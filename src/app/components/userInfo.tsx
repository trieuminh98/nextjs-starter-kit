"use client";
import { getUserInfo } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";

const UserInfo = ({ promise }: { promise: Promise<unknown> }) => {
  const promiseData = use(promise);
  const { data } = useQuery({
    queryKey: ["user-info"],
    queryFn: () => getUserInfo(),
    ...(promiseData ? { initialData: promiseData } : {}),
  });
  return <div>{JSON.stringify(data)}</div>;
};

export default UserInfo;
