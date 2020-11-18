import React from 'react';

const Login = () => {
  return (
    <div id="custom-container" className="ui grid middle aligned">
      <div className="row">
        <div className="column">
          <div className="ui text container">
            <h1>Implicit Grant</h1>
            <p>
              Service Provider registrado en el WSO2 IS. <br />
              Autenticación: Básica
            </p>

            <div className="ui inverted">
              <a
                className="huge ui white button"
                href="https://localhost:9443/oauth2/authorize?scope=openid&response_type=id_token%20token&redirect_uri=http://localhost:3000/home&client_id=vscwF0B_5tGnibaD2XymPMZZoica&nonce=abc"
              >
                Iniciar sesion
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
