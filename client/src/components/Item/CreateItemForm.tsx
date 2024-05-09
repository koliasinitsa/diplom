import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { CreateCar } from '../../interfaces/ItemCardProps';
import ErrorAlert from '../Alert/ErrorAlert';
import SuccessAlert from '../Alert/SuccessAlert';

const CreateItemForm = () => {
    const [formData, setFormData] = useState<CreateCar>('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const formRef = useRef<HTMLFormElement>(null);

    // Обработчик событий для изменения элементов выбора
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Обработчик событий для изменения полей ввода
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        try {
            setSuccessMessage('')
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
            const response = await axios.post('http://localhost:3000/ItemRoutes/createCars', formDataToSend);
            setSuccessMessage(response.statusText)
            formRef.current?.reset();
        } catch (error) {
            setError('Error');
            console.error('Error:', error);
            // Обработка ошибок при выполнении запроса
        }
    };


    return (
        <Container className="d-flex justify-content-center mt-5">
            <Form ref={formRef} onSubmit={handleSubmit} style={{ width: '400px' }}>
                <Form.Group controlId="images">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Select onChange={handleSelectChange} name="type">
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
                    <Form.Label>Количество мест</Form.Label>
                    <Form.Select onChange={handleSelectChange} name="numberOfSeats">
                        <option value="">numberOfSeats</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="typeEngine">
                    <Form.Label>Тип двигателя</Form.Label>
                    <Form.Select onChange={handleSelectChange} name="typeEngine">
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
                    <Form.Label>Расход двигателя</Form.Label>
                    <Form.Control type="number" step="any" placeholder="Enter fuel rate" onChange={handleInputChange} name="fuelRate" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="costDay">
                    <Form.Label>Cost per Day</Form.Label>
                    <Form.Control type="number" placeholder="Enter cost per day" onChange={handleInputChange} name="costDay" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cost3Day">
                    <Form.Label>Cost for 3 Days</Form.Label>
                    <Form.Control type="number" placeholder="Enter cost for 3 days" onChange={handleInputChange} name="cost3Day" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="costWeek">
                    <Form.Label>Cost per Week</Form.Label>
                    <Form.Control type="number" placeholder="Enter cost per week" onChange={handleInputChange} name="costWeek" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="costMonth">
                    <Form.Label>Cost per Month</Form.Label>
                    <Form.Control type="number" placeholder="Enter cost per Month" onChange={handleInputChange} name="costMonth" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="transmission">
                    <Form.Label>Transmission</Form.Label>
                    <Form.Select onChange={handleSelectChange} name="transmission">
                        <option value="">Transmission</option>
                        <option value="Автомат">Автомат</option>
                        <option value="Механика">Механика</option>
                        <option value="Робот">Робот</option>
                        <option value="Вариатор">Вариатор</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Select onChange={handleSelectChange} name="brand">
                        <option value="">Select Brand</option>
                        <option value="Audi">Audi</option>
                        <option value="BMW">BMW</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="Lexus">Lexus</option>
                        <option value="Jaguar">Jaguar</option>
                        <option value="Porsche">Porsche</option>
                        <option value="Tesla">Tesla</option>
                        <option value="Land Rover">Land Rover</option>
                        <option value="Maserati">Maserati</option>
                        <option value="Ferrari">Ferrari</option>
                        <option value="Lamborghini">Lamborghini</option>
                        <option value="Bentley">Bentley</option>
                        <option value="Rolls-Royce">Rolls-Royce</option>
                        <option value="Aston Martin">Aston Martin</option>
                        <option value="McLaren">McLaren</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={handleInputChange} name="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" placeholder="Enter year" onChange={handleInputChange} name="year" />
                </Form.Group>
                {error && <ErrorAlert error={error} />}
                {successMessage && <SuccessAlert message={successMessage} />}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default CreateItemForm;
