import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import SuccessAlert from '../Alert/SuccessAlert';
import ErrorAlert from '../Alert/ErrorAlert';
import { Car } from '../../interfaces/ItemCardProps';

interface ModalProps {
    show: boolean;
    onHide: () => void;
    carinfo: Car; // Объект carInfo
    token: any;
}

const MyVerticallyCenteredModal: React.FC<ModalProps> = ({ show, onHide, carinfo, token }) => { // Переименовываем carinfo в carInfo
    const [formData, setFormData] = useState({
        paymentMethod: '',
        startDate: '',
        endDate: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [daysCount, setDaysCount] = useState<number>(0);
    const [rentalCost, setRentalCost] = useState<number>(0); // Состояние для хранения суммы аренды

    const calculateDays = () => {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && endDate >= startDate) {
            const differenceInTime = endDate.getTime() - startDate.getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            setDaysCount(Math.floor(differenceInDays));
        } else {
            setDaysCount(0);
        }
    };

    console.log(carinfo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const calculateRentalCost = (): number => {
        let totalCost = 0;

        // Расчет общей стоимости в зависимости от количества дней
        if (daysCount === 1) {
            totalCost = carinfo.costDay;
        } else if (daysCount === 3) {
            totalCost = carinfo.cost3Day;
        }else if (daysCount > 3 && daysCount < 7) {
            totalCost = carinfo.costDay * daysCount * 0.7;
        } else if (daysCount === 7) {
            totalCost = carinfo.costWeek;
        } else if (daysCount > 7 && daysCount < 30) {
            totalCost = carinfo.costDay * daysCount * 0.3;
        } else if (daysCount === 30) {
            totalCost = carinfo.costMonth;
        }else if (daysCount > 30) {
            totalCost = carinfo.costDay * daysCount * 0.15;
        } else {
            totalCost = carinfo.costDay * daysCount;
        }

        setRentalCost(totalCost); 
        return totalCost;
    };

    const handleCalculate = () => {
        calculateDays();
        calculateRentalCost();
    };

    const handleSubmit = async () => {
        if (!formData.paymentMethod || !formData.startDate || !formData.endDate) {
            setError('Пожалуйста, заполните все поля формы');
            return;
        }
        const requestData = {
            method: formData.paymentMethod,
            startDate: formData.startDate,
            endDate: formData.endDate,
            itemId: carinfo.carId,
            userId: token,
            daysCount: daysCount,
            rentalCost: rentalCost
        };
        try {
            setSuccessMessage('')
            setError('');
            // Отправляем POST запрос на сервер
            console.log('reqwqwe',requestData)
            const response = await axios.post('http://localhost:3000/OrderRoutes/createOrders', requestData);

            console.log('Order created successfully:', response.data);
            setSuccessMessage('your order accepted')
            setFormData({
                paymentMethod: '',
                startDate: '',
                endDate: ''
            });
            setDaysCount(0);
            setRentalCost(0);

            // onHide(); // Закрываем модальное окно после успешного создания заказа
        } catch (error) {
            setError('reservation already did');
            console.error('Error creating order:', error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Забронировать автомобиль {carinfo.brand} {carinfo.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Group controlId="paymentMethod">
                        <Form.Label>Способ оплаты</Form.Label>
                        <Form.Control
                            as="select"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                        >
                            <option value="">Способ оплаты</option>
                            <option value="credit_card">Кредитная карта</option>
                            <option value="debit_card">Дебетовая карта</option>
                            <option value="charging">Безналичный</option>
                            <option value="cash">Наличные</option>
                        </Form.Control>
                    </Form.Group>
                    <div className="mb-3"></div>
                    <Form.Group controlId="startDate">
                        <Form.Label>Дата начала поездки</Form.Label>
                        <Form.Control
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <div className="mb-3"></div>
                    <Form.Group controlId="endDate">
                        <Form.Label>Дата окончания поездки</Form.Label>
                        <Form.Control
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
                <div style={{ marginTop: '10px' }}>
                    <p>Количество дней: {daysCount}</p>
                    <p>Сумма аренды: {rentalCost}$</p>
                    <Button variant="info" onClick={handleCalculate}>Расчет</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={handleSubmit}>Отправить</Button>
            </Modal.Footer>
            {error && <ErrorAlert error={error} />}
            {successMessage && <SuccessAlert message={successMessage} />}
        </Modal>
    );
};

export default MyVerticallyCenteredModal;
