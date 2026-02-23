import './ModernStyle.css'

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  }[]
;

export function UserView({ user }: { user: any }) {
  return (
    <div>Users</div>
  );
}