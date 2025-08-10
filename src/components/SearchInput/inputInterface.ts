export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}