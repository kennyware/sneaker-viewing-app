import { StyledRegister } from "./styled/Register.styled";
import loginImg from "../loginImg.jpg";
import Loader from "./Loader";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, reset } from "../features/auth/authSlice";
import ErrorBox from "./ErrorBox";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");

  const { email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, user, isError, message, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (user || isSuccess) {
      navigate("/", { replace: true });
    }

    dispatch(reset());
  }, [isError, message, isSuccess, user, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
    }

    if (password !== password2) {
      setError("Passwords do not match.");
      return null;
    }

    dispatch(registerUser({ email, password }));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) return <Loader />;

  return (
    <StyledRegister>
      <div className="register-group display">
        <h1>FLY AMER1CA</h1>
        <img src={loginImg} alt="jordan shoes" />
      </div>
      <div className="register-group">
        {error && <ErrorBox error={error} />}
        <h1>Sign Up</h1>
        <form id="register-form" onSubmit={onSubmit}>
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
          <div>
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={password2}
              onChange={onChange}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </StyledRegister>
  );
};

export default Register;
