import React from 'react';
import { Layout, Row, Col } from 'antd';
import '../styles/footer.css';
import { Footer } from 'antd/es/layout/layout';



const Footers = () => {
  return (
    <Footer className="footer">
      <Row gutter={16}>
        <Col span={6}>
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
        </Col>
        <Col span={6}>
          <h3>Services</h3>
          <ul>
            <li><a href="/service1">Service 1</a></li>
            <li><a href="/service2">Service 2</a></li>
            <li><a href="/service3">Service 3</a></li>
          </ul>
        </Col>
        <Col span={6}>
          <h3>Contact</h3>
          <p>123 Street Name, City, Country</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: contact@myapp.com</p>
        </Col>
        <Col span={6}>
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li><a href="https://facebook.com">Facebook</a></li>
            <li><a href="https://twitter.com">Twitter</a></li>
            <li><a href="https://instagram.com">Instagram</a></li>
          </ul>
        </Col>
      </Row>
      <div className="copyright">
        &copy; 2024 MyApp. All rights reserved.
      </div>
    </Footer>
  );
};

export default Footers;
