'use client';
import { getUserInfo } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const UserInfo = () => {
  const { data } = useQuery({
    queryKey: ['user-info'],
    queryFn: () => getUserInfo(),
  });
  return <div>{JSON.stringify(data)}</div>;
};

export default UserInfo;
