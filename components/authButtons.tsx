import { FunctionComponent } from "react";

import Button, { ButtonType, ButtonSize } from "./button";
import Link from "next/link";
import A from "./a";

const AuthButtons: FunctionComponent = () => (
  <div>
    <Link href="/login">
      <A>
        <Button
          buttonSize={ButtonSize.Small}
          buttonType={ButtonType.Transparent}
          style={{ marginRight: "1rem" }}
        >
          Войти
        </Button>
      </A>
    </Link>
    <Link href="/register">
      <A>
        <Button buttonSize={ButtonSize.Small} buttonType={ButtonType.White}>
          Зарегистрироваться
        </Button>
      </A>
    </Link>
  </div>
);

export default AuthButtons;
