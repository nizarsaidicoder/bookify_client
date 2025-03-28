type SignInData = {
  username: string;
  password: string;
};

type SignUpData = {
  username: string;
  email: string;
  password: string;
};

type User = {
  id: number;
  username: string;
  email: string;
};

type UserToken = {
  token: string;
  user: User;
};

export type { SignInData, SignUpData, User, UserToken };
