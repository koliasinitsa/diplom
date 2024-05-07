import React from 'react';
import registr from './regis.png'
import login from './login.png'
import main from './main.png'
import carpage from './carpage.png'
import modal from './modal.png'

export const Spravka: React.FC = () => {

    return (

        <div className="container">
            <div style={{marginBottom: "20px"}}>
                <h2>Окно регистрации</h2>
                <p>В этом окне вы можете зарегистрироваться для доступа к аккаунту на сайте.</p>
                <p>Пожалуйста, введите вашу почту и пароль.</p>
                <img src={registr} alt="Окно регистрации" style={{ width: '500px' }} />
            </div>
            <div style={{marginBottom: "20px"}}>
                <h2>Окно логина</h2>
                <p>Используйте это окно для входа в свой аккаунт на сайте.</p>
                <p>Введите вашу почту и пароль, чтобы войти.</p>
                <img src={login} alt="Окно логина" style={{ width: '500px' }} />
            </div>
            <div style={{marginBottom: "20px"}}>
                <h2>Мой профиль</h2>
                <p>Здесь вы можете просмотреть информацию о своем профиле и, при необходимости, отредактировать его.</p>
                <img src={modal} alt="Мой профиль" style={{ width: '500px' }} />
            </div>
            <div style={{marginBottom: "20px"}}>
                <h2>Заполнить мой профиль</h2>
                <p>Используйте эту страницу для заполнения информации о своем профиле.</p>
                <p>Пожалуйста, укажите все необходимые данные.</p>
                <img src={modal} alt="Заполнить мой профиль" style={{ width: '500px' }} />
            </div>
            <div style={{marginBottom: "20px"}}>
                <h2>Главное окно с показом всех машин</h2>
                <p>На этой странице отображается список всех доступных машин.</p>
                <p>Вы можете просматривать информацию о каждой машине и сравнивать их.</p>
                <img src={main} alt="Главное окно с показом всех машин" style={{ width: '500px' }} />
            </div>
            <div style={{marginBottom: "20px"}}>
                <h2>Окно отдельной машины</h2>
                <p>Здесь представлена подробная информация об отдельной машине.</p>
                <p>Вы можете просмотреть ее характеристики и изображения.</p>
                <img src={carpage} alt="Окно отдельной машины" style={{ width: '500px' }} />
            </div>
            <div style={{marginBottom: "20px"}}>
                <h2>Модальное окно заказа машины</h2>
                <p>Используйте это модальное окно для оформления заказа выбранной машины.</p>
                <p>Укажите необходимые данные и подтвердите заказ.</p>
                <img src={modal} alt="Модальное окно заказа машины" style={{ width: '500px' }} />
            </div>
        </div>
    )
}