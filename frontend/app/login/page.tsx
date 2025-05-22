import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="flex flex-col gap-2 p-4 w-1/3">
      <label className="gold-text" htmlFor="email">
        Email:
      </label>
      <input
        className="gold-border w-full"
        id="email"
        name="email"
        type="email"
        required
      />
      <label className="gold-text" htmlFor="password">
        Password:
      </label>
      <input
        className="gold-border w-full"
        id="password"
        name="password"
        type="password"
        required
      />
      <div className="flex flex-row gap-4">
        <button formAction={login} className="gold-button">
          Log in
        </button>
        <button formAction={signup} className="gold-button">
          Sign up
        </button>
      </div>
    </form>
  );
}
