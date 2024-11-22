export interface Developer {
  _id: string;
  imageUrl?: string;
  firstName: string;
  lastName: string;
  telephone: string;
  email: string;
  city: string;
  state: string;
  portfolioLink?: string;
  githubLink?: string;
  hourlyRate: number;
  bio: string;
}
