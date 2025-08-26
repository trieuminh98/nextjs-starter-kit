'use client';
import { getUserInfo } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAtomValue } from 'jotai';
import { configsAtom } from '@/state/configs';

const UserInfo = () => {
  const { data } = useQuery({
    queryKey: ['user-info'],
    queryFn: () => getUserInfo(),
  });
  const configs = useAtomValue(configsAtom);
  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="font-medium mb-1">User Info</div>
        <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-2">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      <div>
        <div className="font-medium mb-1">Configs (hydrated)</div>
        <pre className="text-xs bg-black/5 dark:bg-white/10 rounded p-2">
          {JSON.stringify(configs, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default UserInfo;
