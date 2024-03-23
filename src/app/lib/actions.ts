'use server';

import { signIn, signOut } from '$/auth';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  
export async function uploadReport(
  prevState: void | undefined,
  formData: FormData,
) {
  const res = await fetch(process.env.backend + '/create/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      msg: formData.get('msg'),
      gps_lat: 0,
      gps_lng: 0
    })
  });
  console.log(res.json());
  
};


export async function logout(){

    await signOut();

}

export async function fix(id: number){
  
  const res = await fetch(process.env.backend+'/fix', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id})
});

  const data = await res.json();



  if(data.fixed){

      return true;
  }


  return false;

}


export async function fetchIssues() {
  const response = await fetch(process.env.backend+"/reports?limit=20&offset=0");
  const data = await response.json();
  return data;
}
