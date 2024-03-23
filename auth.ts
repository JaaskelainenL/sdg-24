import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import {z} from 'zod';
import type { User } from '@/app/lib/definitions';
 
async function getUser(name: string, password: string): Promise<User | undefined> {

    const res = await fetch(process.env.backend+'/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: name, pass: password})
    });
      

    const data = await res.json();



    if(data.ok){

        return {
            name: data.name,
            role: data.role
          };

    }


    return undefined;

}



export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
      Credentials({
        async authorize(credentials) {

          const parsedCredentials = z
            .object({ name: z.string().min(1), password: z.string().min(1) })
            .safeParse(credentials);
   
          if (parsedCredentials.success) {
            const { name, password } = parsedCredentials.data;
            const user = await getUser(name,password);
            if (!user) return null;
            return user;
          }
   
          return null;
        },
      }),
    ],
  });