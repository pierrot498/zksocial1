export interface IProfile {
  id: string;
  name: string;
  age: number;
  bio?: string;
  location?: string;
  user: {
    walletAddress: string;
  };
  image?: string;
}
