import { Form, Link , useActionData, useNavigation, useSearchParams} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  const data= useActionData();
  const navigation= useNavigation();
 const[searchParams, setSearchParams]=useSearchParams();
 const isLogin = searchParams.get("mode") ==="login";
console.log(data)
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>

        {data && data.errors && 
        Object.entries(data.errors).map(([key, value]) => (
        <li key={key} style={{ color: "red" }}>{value}</li>
  ))
}

        {data && data.message && <p style={{color:"red"}}>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button>{navigation.state === "submitting" ? "submitting..." : "save"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
