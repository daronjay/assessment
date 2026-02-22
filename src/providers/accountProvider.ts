import React, { type JSX, type PropsWithChildren } from 'react';
import { AccountContext, AccountState } from '../contexts/accountContext';
export const AccountProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const state = AccountState();
  return React.createElement(AccountContext.Provider, { value: state }, children);
};