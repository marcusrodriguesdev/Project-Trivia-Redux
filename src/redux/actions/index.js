export default function ClickButtonLogin(valorRecebidoEmail, valorRecebidoSenha) {
  return (
    {
      type: 'CLICK_BUTTON_LOGIN',
      email: valorRecebidoEmail,
      senha: valorRecebidoSenha,
    }
  );
}
