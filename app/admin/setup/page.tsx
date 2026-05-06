import { redirect } from 'next/navigation';

// Admin setup has been disabled after initial setup
export default function AdminSetupPage() {
  redirect('/admin/login');
}
