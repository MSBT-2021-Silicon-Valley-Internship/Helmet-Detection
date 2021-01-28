import React, { Component } from "react";
import CameraTest from "./CameraTest";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="header">
          <div class="container header__container">
            <div class="header__logo">
              <img
                class="header__img"
                src="https://www.flaticon.com/svg/vstatic/svg/763/763396.svg?token=exp=1611255642~hmac=bbc8a7d0b545eea4e2e9e503edd9a92b"
              ></img>
              <h1 class="header__title">
                Helmet<span class="header__light">.ID</span>
              </h1>
            </div>
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="true"
              aria-controls="navbar"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>

            <div class="header__menu">
              <nav id="navbar" class="header__nav collapse">
                <ul class="header__elenco">
                  <li class="header__el">
                    <a href="#" class="header__link">
                      Main
                    </a>
                  </li>
                  <li class="header__el">
                    <a href="#" class="header__link">
                      Result
                    </a>
                  </li>
                  <li class="header__el">
                    <a href="#" class="header__link">
                      Where to Use
                    </a>
                  </li>
                  <li class="header__el">
                    <a href="#" class="header__link">
                      About
                    </a>
                  </li>
                  <li class="header__el">
                    <a href="#" class="header__link">
                      Team
                    </a>
                  </li>
                  <li class="header__el header__el--blue">
                    <a href="" class="btn btn--white">
                      Sign In →
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div>
          <div class="sect sect--padding-top">
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="site">
                    <h1 class="site__title">
                      Helmet Recognition AI
                      <span class="header__light">: Helmet ID</span>
                      <br></br>
                      <br></br>
                    </h1>
                    <h2 class="site__subtitle">
                      FACE ID 처럼 당신의 헬멧 착용 여부를 인식해주는 AI입니다.
                      <br></br>
                      <br></br>
                      헬멧을 착용한 상태에서 캡쳐 버튼을 누른 후 카메라를 5초 간
                      응시해주세요.
                    </h2>
                    <div class="site__box-link"></div>
                    <CameraTest className="site__img"></CameraTest>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="sect sect--white">
            <div class="container">
              <div class="row">
                <h1 class="row__title">헬멧을 필수로 착용해야하는 경우</h1>
                <br></br>
                <h2 class="row__sub">Must wear a Helmet </h2>
              </div>
              <div class="row row--margin row--text-center">
                <div class="col-md-8 col-sm-10 col-xs-12 row__carousel">
                  <div
                    id="myCarousel"
                    class="carousel slide"
                    data-ride="carousel"
                  >
                    <ol class="carousel-indicators">
                      <li
                        data-target="#myCarousel"
                        data-slide-to="0"
                        class="active"
                      ></li>
                      <li data-target="#myCarousel" data-slide-to="1"></li>
                      <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                      <div class="item active">
                        <div class="item__content">
                          <img
                            class="item__img"
                            src="https://cdn.worldvectorlogo.com/logos/slack-1.svg"
                            alt="Slack"
                          ></img>
                          <span class="item__name">slack</span>

                          <p class="item__description">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit. Aenean commodo ligula eget dolor. Aenean
                            massa. Cum sociis natoque penatibus et magnis dis
                            parturient montes, nascetur ridiculus mus. Donec
                            quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem. Nulla consequat massa quis enim. Donec
                            pede justo, fringilla vel, aliquet nec, vulputate
                            eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                            venenatis vitae, justo.
                          </p>
                        </div>
                        <div class="item__avatar"></div>
                        <p class="item__people">전동 킥보드</p>
                        <p class="item__occupation">Ceo of Google</p>
                      </div>

                      <div class="item">
                        <div class="item__content">
                          <img
                            class="item__img"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Google-favicon-2015.png/150px-Google-favicon-2015.png"
                            alt="Google"
                          ></img>
                          <span class="item__name">google</span>

                          <p class="item__description">
                            Cum sociis natoque penatibus et magnis dis
                            parturient montes, nascetur ridiculus mus. Donec
                            quam felis, ultricies nec, pellentesque eu, pretium
                            quis, sem. Nulla consequat massa quis enim. Donec
                            pede justo, fringilla vel, aliquet nec, vulputate
                            eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                            venenatis vitae, justo.
                          </p>
                        </div>
                        <div class="item__avatar"></div>
                        <p class="item__people">오토바이</p>
                        <p class="item__occupation">Ceo of Dribbble</p>
                      </div>

                      <div class="item">
                        <div class="item__content">
                          <img
                            class="item__img"
                            src="https://www.hrexaminer.com/wp-content/uploads/2016/10/2016-10-11-hrexaminer-stackoverflow-6-xxl-sq-250px.png"
                            alt="Stackoverflow"
                          ></img>
                          <span class="item__name">stackoverflow</span>

                          <p class="item__description">
                            Donec quam felis, ultricies nec, pellentesque eu,
                            pretium quis, sem. Nulla consequat massa quis enim.
                            Donec pede justo, fringilla vel, aliquet nec,
                            vulputate eget, arcu. In enim justo, rhoncus ut,
                            imperdiet a, venenatis vitae, justo.
                          </p>
                        </div>
                        <div class="item__avatar"></div>
                        <p class="item__people">스키/스노우보드</p>
                        <p class="item__occupation">Ceo of Slack</p>
                      </div>
                    </div>

                    <a
                      class="left carousel-control"
                      href="#myCarousel"
                      data-slide="prev"
                    >
                      <img
                        class="carousel-control__img"
                        src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5NCAzMS40OTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxLjQ5NCAzMS40OTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KPHBhdGggZD0iTTEwLjI3Myw1LjAwOWMwLjQ0NC0wLjQ0NCwxLjE0My0wLjQ0NCwxLjU4NywwYzAuNDI5LDAuNDI5LDAuNDI5LDEuMTQzLDAsMS41NzFsLTguMDQ3LDguMDQ3aDI2LjU1NCAgYzAuNjE5LDAsMS4xMjcsMC40OTIsMS4xMjcsMS4xMTFjMCwwLjYxOS0wLjUwOCwxLjEyNy0xLjEyNywxLjEyN0gzLjgxM2w4LjA0Nyw4LjAzMmMwLjQyOSwwLjQ0NCwwLjQyOSwxLjE1OSwwLDEuNTg3ICBjLTAuNDQ0LDAuNDQ0LTEuMTQzLDAuNDQ0LTEuNTg3LDBsLTkuOTUyLTkuOTUyYy0wLjQyOS0wLjQyOS0wLjQyOS0xLjE0MywwLTEuNTcxTDEwLjI3Myw1LjAwOXoiIGZpbGw9IiM2Zjc5ZmYiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
                      />
                    </a>
                    <a
                      class="right carousel-control"
                      href="#myCarousel"
                      data-slide="next"
                    >
                      <img
                        class="carousel-control__img"
                        src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5IDMxLjQ5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMS40OSAzMS40OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIzMnB4IiBoZWlnaHQ9IjMycHgiPgo8cGF0aCBkPSJNMjEuMjA1LDUuMDA3Yy0wLjQyOS0wLjQ0NC0xLjE0My0wLjQ0NC0xLjU4NywwYy0wLjQyOSwwLjQyOS0wLjQyOSwxLjE0MywwLDEuNTcxbDguMDQ3LDguMDQ3SDEuMTExICBDMC40OTIsMTQuNjI2LDAsMTUuMTE4LDAsMTUuNzM3YzAsMC42MTksMC40OTIsMS4xMjcsMS4xMTEsMS4xMjdoMjYuNTU0bC04LjA0Nyw4LjAzMmMtMC40MjksMC40NDQtMC40MjksMS4xNTksMCwxLjU4NyAgYzAuNDQ0LDAuNDQ0LDEuMTU5LDAuNDQ0LDEuNTg3LDBsOS45NTItOS45NTJjMC40NDQtMC40MjksMC40NDQtMS4xNDMsMC0xLjU3MUwyMS4yMDUsNS4wMDd6IiBmaWxsPSIjNmY3OWZmIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer">
            <div class="container">
              <div class="row">
                <div class="col-md-2 col-xs-6">
                  <img
                    class="footer__img"
                    src="https://www.flaticon.com/svg/vstatic/svg/763/763396.svg?token=exp=1611255642~hmac=bbc8a7d0b545eea4e2e9e503edd9a92b"
                  ></img>{" "}
                  <h1 class="footer__title">
                    Helmet<span class="footer__light">: ID</span>
                  </h1>
                </div>
                <div class="col-md-10 col-xs-6">
                  <div class="footer__social">
                    <a href="#" class="footer__social-l"></a>
                    <a href="#" class="footer__social-l"></a>
                    <a href="#" class="footer__social-l"></a>
                    <a href="" class="footer__social-l"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
