'use client'
import { signOut, useSession } from '@/lib/auth-client';
import Link from 'next/link';

const Avatar = () => {
    const { data: session } = useSession()
    return (
        <div>
            {
                session?(<div className="dropdown dropdown-end relative z-50">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="UserImg"
            src={session?.user?.image ?? '/default-avatar.png'}
          />
        </div>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li className='font-semibold'>{session?.user?.name}</li>
            <li className='text-gray-500'>{session?.user?.email}</li>
        <li>
          <Link href={'/profile'} className="justify-between">
            👤 Profile
          </Link>
        </li>
        <button onClick={()=>signOut()} className="flex items-center gap-1.5 transition-colors cursor-pointer bg-red-500/50 w-13 p-1 rounded-md hover:text-white">Logout</button>
      </ul>
    </div>)
        :(<ul className="flex items-center gap-6 text-sm">
          <li>
            <Link href="/login" className="transition-colors hover:text-cyan-400">
              Login
            </Link>
          </li>
          <li>
            <Link href="/signup" className="transition-colors hover:text-cyan-400">
              Sign Up
            </Link>
          </li>
        </ul>)
            }
        </div>
        
    );
};

export default Avatar;