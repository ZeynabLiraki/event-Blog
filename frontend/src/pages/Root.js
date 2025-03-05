import { Outlet, redirect, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../utils/auth';

function RootLayout() {
const token= useLoaderData();
const submit=useSubmit();
useEffect(()=>{
if (!token){
 return redirect("/auth?mode=login");
}

if (token==="EXPIRED"){
  submit(null, {action:"/logout", method:"post"})
  return;
}
const tokenDuration=getTokenDuration()
const x=setTimeout(() => {
  submit(null, {action:"/logout", method:"post"})
}, tokenDuration);
return ()=> clearTimeout(x)
}, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
