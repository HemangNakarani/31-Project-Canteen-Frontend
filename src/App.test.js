import {
  cleanup,
  render,
} from "@testing-library/react";
import App from "./App";
import { UserProvider } from "./Context/UserContext";
import Login from "./Pages/AuthView/Login";
import SignUp from "./Pages/AuthView/Signup";

afterEach(cleanup);

test("Render without crash App.js", async () => {
  const { debug } = render(
    <UserProvider>
      <App />
    </UserProvider>
  );

  //await waitForDomChange();
  //debug();

});

test("Render without crash Login.js", async () => {
  const { debug } = render(
    <UserProvider>
      <Login />
    </UserProvider>
  );
});

test("Render without crash SignUp.js", async () => {
  const { debug } = render(<SignUp />);
});
