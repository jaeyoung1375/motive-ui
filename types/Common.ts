import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

export type ButtonProps = {
  text?: string;
  type?: string;
  onClick?: () => void;
};

export type InputProps = {
  text?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type SelectProps<T> = {
  text?: string;
  list?: T[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export type SelectOption = {
  codeId: string | undefined;
  codeName: string | undefined;
};
