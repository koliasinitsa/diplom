import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const CreateItemForm = () => {
    const [formData, setFormData] = useState<{
        type: string;
        numberOfSeats: number;
        typeEngine: string;
        fuelRate: number;
        costDay: number;
        cost3Day: number;
        costWeek: number;
        transmission: string;
        name: string;
        year: number;
        images: File | null; // Определение типа для image
    }>({
        type: '',
        numberOfSeats: 0,
        typeEngine: '',
        fuelRate: 0,
        costDay: 0,
        cost3Day: 0,
        costWeek: 0,
        transmission: '',
        name: '',
        year: 0,
        images: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Проверяем, является ли поле числовым
        const isNumericField = ['numberOfSeats', 'fuelRate', 'costDay', 'cost3Day', 'costWeek', 'year'].includes(name);
        // Преобразуем значение в число, если это числовое поле
        const numericValue = isNumericField ? parseFloat(value) : value; // Используйте parseFloat для всех числовых полей
        setFormData(prevState => ({
            ...prevState,
            [name]: numericValue
        }));
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files && e.target.files[0]; // Проверка наличия файла
        setFormData(prevState => ({
            ...prevState,
            images: imageFile
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData); // Вывод данных в консоль
        try {
            const formDataToSend = new FormData();
            if (formData.images) {
                formDataToSend.append('images', formData.images); // Добавляем файл изображения
            }
            for (const [key, value] of Object.entries(formData)) {
                if (key !== 'images' && value !== null) {
                    formDataToSend.append(key, value.toString());
                }
            }
            // надо сделать проверку на заполяемость формы, чтобы все были выбранны
            // очищение формы, и алерты вывод
           // const response = await axios.post('http://localhost:3000/api/createCars', formDataToSend);

            console.log('Data sent successfully');
           // console.log('Response:', response.data); // Вывод ответа в консоль
            // Дополнительные действия после успешной отправки данных
        } catch (error) {
            console.error('Error:', error);
            // Обработка ошибок при выполнении запроса
        }
    };

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
                <Form.Group controlId="images">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Select onChange={handleChange} name="type">
                        <option value="">Type</option>
                        <option value="Внедорожник">Внедорожник</option>
                        <option value="кабриолет">кабриолет</option>
                        <option value="купе">купе</option>
                        <option value="микроавтобус">микроавтобус</option>
                        <option value="лифтбек">лифтбек</option>
                        <option value="минивэн">минивэн</option>
                        <option value="седан">седан</option>
                        <option value="универсал">универсал</option>
                        <option value="хэтчбэк 3дв">хэтчбэк 3 дв</option>
                        <option value="хэтчбэк 5дв">хэтчбэк 5 дв</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="numberOfSeats">
                    <Form.Label>Number of Seats</Form.Label>
                    <Form.Select onChange={handleChange} name="numberOfSeats">
                        <option value="">numberOfSeats</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="typeEngine">
                    <Form.Label>Engine Type</Form.Label>
                    <Form.Select onChange={handleChange} name="typeEngine">
                        <option value="">Engine Type</option>
                        <option value="Бензин">Бензин</option>
                        <option value="Бензин(метан)">Бензин(метан)</option>
                        <option value="Бензин(гибрид)">Бензин(гибрид)</option>
                        <option value="Дизель">Дизель</option>
                        <option value="Дизель(гибрид)">Дизель(гибрид)</option>
                        <option value="Электро">Электро</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="fuelRate">
                    <Form.Label>Fuel Rate</Form.Label>
                    <Form.Control type="number" step="any" placeholder="Enter fuel rate" onChange={handleChange} name="fuelRate" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="costDay">
                    <Form.Label>Cost per Day</Form.Label>
                    <Form.Control type="number" placeholder="Enter cost per day" onChange={handleChange} name="costDay" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cost3Day">
                    <Form.Label>Cost for 3 Days</Form.Label>
                    <Form.Control type="number" placeholder="Enter cost for 3 days" onChange={handleChange} name="cost3Day" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="costWeek">
                    <Form.Label>Cost per Week</Form.Label>
                    <Form.Control type="number" placeholder="Enter cost per week" onChange={handleChange} name="costWeek" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="transmission">
                    <Form.Label>Transmission</Form.Label>
                    <Form.Select onChange={handleChange} name="transmission">
                        <option value="">Transmission</option>
                        <option value="Автомат">Автомат</option>
                        <option value="Механика">Механика</option>
                        <option value="Робот">Робот</option>
                        <option value="Вариатор">Вариатор</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={handleChange} name="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" placeholder="Enter year" onChange={handleChange} name="year" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default CreateItemForm;
