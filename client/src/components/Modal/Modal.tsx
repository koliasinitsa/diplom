import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

interface ModalProps {
    show: boolean;
    onHide: () => void;
    carDetails: { itemId: string | undefined; name: string | undefined };
}

const MyVerticallyCenteredModal: React.FC<ModalProps> = ({ show, onHide, carDetails }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(e.target.value);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const handleSubmit = () => {
        
        // Здесь можно отправить данные на сервер
        console.log('Payment Method:', paymentMethod);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
        console.log('id:', carDetails.itemId);

        // Закрываем модальное окно после отправки данных
        onHide();
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
                Забронировать автомобиль {carDetails.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="paymentMethod">
                        <Form.Label>Способ оплаты</Form.Label>
                        <Form.Control as="select" onChange={handlePaymentMethodChange}>
                            <option value="credit_card">Кредитная карта</option>
                            <option value="debit_card">Дебетовая карта</option>
                            <option value="charging">Безналичный</option>
                            <option value="cash">Наличные</option>
                        </Form.Control>
                    </Form.Group>
                    <div className="mb-3"></div>
                    <Form.Group controlId="startDate">
                        <Form.Label>Дата начала поездки</Form.Label>
                        <Form.Control type="date" onChange={handleStartDateChange} />
                    </Form.Group>
                    <div className="mb-3"></div>
                    <Form.Group controlId="endDate">
                        <Form.Label>Дата окончания поездки</Form.Label>
                        <Form.Control type="date" onChange={handleEndDateChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={handleSubmit}>Отправить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyVerticallyCenteredModal;
