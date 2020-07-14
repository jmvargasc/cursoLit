import { css } from "lit-element";

export const miCSS = css`
  p {
    color: red;
  }
`;

export const ESTILOS_PAGE_PRINCIPAL = css`
  * {
    margin: 0;
    padding: 0;
    --webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .contenedor {
    width: 90%;
    max-width: 1000px;
    margin: 20px auto;
    overflow: hidden;
  }
  .lugares {
    margin-bottom: 20px;
    height: 100px;
  }
  header {
    background: #fff;
  }
  header nav {
    width: 100%;
  }
  .main {
    width: 700px;
    background: #fff;
    float: left;
  }
  .main .image {
    width: 50%;
    height: 50%;
  }
  main .image img {
    height: 50%;
    wetical-aling: top;
  }
  .imagen {
    height: 80px;
  }

  .votar {
    margin-top: 10px;
  }
  .fotoPerfil {
    margin: 5px;
  }
  .contenedorCards:hover {
    background: #b4b3b3;
    color: #fff;
  }
  .loading1 {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: rgba(192, 192, 192, 0.5);
    background-image: url("./src/assets/image/loading.gif");
    background-repeat: no-repeat;
    background-position: center;
  }
`;
