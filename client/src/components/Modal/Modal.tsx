import React, { useState  } from 'react';
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
    carinfo: Car;
    token: any;
}

const MyVerticallyCenteredModal: React.FC<ModalProps> = ({ show, onHide, carinfo, token, }) => {
    const [formData, setFormData] = useState({
        paymentMethod: '',
        startDate: '',
        endDate: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    

    console.log(carinfo)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
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
            userId: token
        };
        try {
            setSuccessMessage('')
            setError('');
            // Отправляем POST запрос на сервер
            console.log(requestData)
            const response = await axios.post('http://localhost:3000/OrderRoutes/createOrders', requestData);

            console.log('Order created successfully:', response.data);
            setSuccessMessage('your order accepted')
            setFormData({
                paymentMethod: '',
                startDate: '',
                endDate: ''
            });
            
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={handleSubmit}>Отправить</Button>
            </Modal.Footer>
            {error && <ErrorAlert error={error}  />}
            {successMessage && <SuccessAlert message={successMessage}  />}
        </Modal>
    );
};

export default MyVerticallyCenteredModal;
