import React, { useState, useEffect, useRef } from 'react';
import oauth2 from '../api/oauth2';

const Home = () => {
  const flagRef = useRef();
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    country: '',
  });

  const [tokens, setTokens] = useState({
    accessToken: '',
    idToken: '',
  });

  useEffect(() => {
    if (flagRef.current !== true) {
      flagRef.current = true;

      (async () => {
        const [accessToken, idToken] = getTokens();

        setTokens({
          accessToken,
          idToken,
        });

        console.log(`Access Token -> ${accessToken}`);
        console.log(`Id Token -> ${idToken}`);

        try {
          const response = await oauth2.get('/userinfo?schema=openid', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log(response);
          setUserInfo({
            username: response.data.sub,
            email: response.data.email,
            country: response.data.country,
          });
        } catch (error) {
          console.log('Ha ocurrido un error consumiendo la api de user info');
          console.log(error);
        }
      })();
    }
  }, [userInfo]);

  return (
    <div id="custom-container" className="ui grid middle aligned">
      <div className="row">
        <div className="column">
          <div className="ui text container">
            <h1>Implicit Grant</h1>
            <p>Bienvenido. Inicio de sesion exitoso!</p>
            <p>Informacion de usuario:</p>
            {userInfo.username ? (
              <div className="ui list">
                <div className="item">
                  <div className="header" style={{ color: 'white' }}>
                    Nombre de Usuario
                  </div>
                  {userInfo.username}
                </div>
                <div className="item">
                  <div className="header" style={{ color: 'white' }}>
                    Email
                  </div>
                  {userInfo.email}
                </div>
                <div className="item">
                  <div className="header" style={{ color: 'white' }}>
                    Pais
                  </div>
                  {userInfo.country}
                </div>
              </div>
            ) : (
              <div>
                <p>Cargando informacion de usuario...</p>
              </div>
            )}

            <br />
            <div className="ui inverted">
              <a
                className="huge ui white button"
                href={`https://localhost:9443/oidc/logout?id_token_hint=${tokens.idToken}&post_logout_redirect_uri=http://localhost:3000/`}
              >
                Cerrar sesion
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getTokens() {
  var accessToken = false;
  var idToken = false;

  var fragment = window.location.hash.substring(1);

  if (fragment.indexOf('&') > 0) {
    var arrParams = fragment.split('&');
    var i = 0;

    for (i = 0; i < arrParams.length; i++) {
      var sParam = arrParams[i].split('=');

      if (sParam[0] === 'access_token') {
        accessToken = sParam[1];
      }

      if (sParam[0] === 'id_token') {
        idToken = sParam[1];
      }

      if (accessToken && idToken) return [accessToken, idToken];
    }
  }

  return '';
}

export default Home;
