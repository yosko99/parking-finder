import React from 'react';

import { Col, Form, Image, Row } from 'react-bootstrap';

import acceptedCardsIMG from '../../assets/accepted-cards.jpg';
import countryList from '../../constants/countries';

const PaymentInformation = () => {
  return (
    <div className="shadow-sm border py-2">
      <p className="fs-2 m-4">Payment information</p>
      <div className="m-4 w-25">
        <p className="mb-1">Accepted payments</p>
        <Image src={acceptedCardsIMG} fluid />
      </div>
      <div className="mx-4">
        <Form.Group className="mb-3">
          <Form.Label>Cardholder name</Form.Label>
          <Form.Control
            type="text"
            className="border"
            required
            name="cardholderName"
            placeholder="Dave Davidson"
            minLength={3}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Card number</Form.Label>
          <Form.Control
            type="number"
            className="border"
            required
            name="cardNumber"
            placeholder="514038915711403"
            minLength={3}
            maxLength={12}
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Expiry</Form.Label>
              <Form.Control
                type="text"
                className="border"
                required
                pattern="(?:0[1-9]|1[0-2])/[0-9]{2}"
                name="expiry"
                placeholder="01/12"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                maxLength={3}
                className="border"
                required
                name="cvv"
                placeholder="123"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Billing postcode</Form.Label>
              <Form.Control
                type="text"
                className="border"
                required
                name="postCode"
                placeholder="1234"
                maxLength={4}
                minLength={3}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Select name="country">
                {countryList.map((country, index) => (
                  <option value={country} key={index}>
                    {country}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PaymentInformation;
