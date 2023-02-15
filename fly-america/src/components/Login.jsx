import { StyledLogin } from "./styled/Login.styled";
import loginImg from "../loginImg.jpg";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import ErrorBox from "./ErrorBox";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { email, password } = formData;

  const { isLoading, isSuccess, message, isError, user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (user || isSuccess) {
      navigate("/", { replace: true });
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, message, isSuccess, user, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    dispatch(login({ email, password }));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) return <Loader />;

  return (
    <StyledLogin>
      <div className="login-group display">
        <h1>FLY AMER1CA</h1>
        <img src={loginImg} alt="jordan shoes" />
      </div>
      <div className="login-group">
        {error && <ErrorBox error={error} />}
        <h1>Login</h1>
        <form id="login-form" onSubmit={onSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </StyledLogin>
  );
};

export default Login;
