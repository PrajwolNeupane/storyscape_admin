export interface LoginInputProps {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  register: Function;
}

export interface AuthResponse {
  email: string;
  isCreater: boolean;
  name: string;
  photoURL: string;
  message: string | null;
}
