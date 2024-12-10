import { Col, Layout, Row, Image, Typography } from 'antd';
const { Footer } = Layout;
const { Paragraph } = Typography;
import doccure from '../../assets/doccure.png';

const HomeFooter = () => {
  const importantLink = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  return (
    <Footer className=" text-center py-8">
      <Row gutter={[16, 16]} className="grid grid-cols-12 gap-4">
        <Col className="col-span-12 sm:col-span-6 md:col-span-3">
          <Image
            preview={false}
            src={doccure}
            style={{
              height: '50px',
              marginBottom: '10px',
            }}
          />
          <Paragraph className="text-left text-gray-400 text-sm">
            We&apos;re no strangers to love.
            <br />
            You know the rules and so do I.
            <br />
            A full commitment&apos;s what I&apos;m thinking of.
            <br />
            You wouldn&apos;t get this from any other guy.
          </Paragraph>
        </Col>
        <Col className="col-span-12 sm:col-span-6 md:col-span-3">
          <Paragraph className="font-semibold text-lg">Company</Paragraph>
          <ul className="list-none text-gray-400">
            <li>
              <a
                href={importantLink}
                target="_blank"
                className="hover:text-cyan-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href={importantLink}
                target="_blank"
                className="hover:text-cyan-300"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href={importantLink}
                target="_blank"
                className="hover:text-cyan-300"
              >
                Blog
              </a>
            </li>
          </ul>
        </Col>
        <Col className="col-span-12 sm:col-span-6 md:col-span-3">
          <Paragraph className="font-semibold text-lg">Support</Paragraph>
          <ul className="list-none text-gray-400">
            <li>
              <a
                href={importantLink}
                target="_blank"
                className="hover:text-cyan-300"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href={importantLink}
                target="_blank"
                className="hover:text-cyan-300"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href={importantLink}
                target="_blank"
                className="hover:text-cyan-300"
              >
                FAQs
              </a>
            </li>
          </ul>
        </Col>
        <Col className="col-span-12 sm:col-span-6 md:col-span-3">
          <Paragraph className="font-semibold text-lg">Follow Us</Paragraph>
          <ul className="list-none text-gray-400">
            <li>
              <a
                href={importantLink}
                target="_blank"
                className="hover:text-cyan-300"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href={importantLink}
                target="_blank"
                className="hover:text-cyan-300"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={importantLink}
                target="_blank"
                className="hover:text-cyan-300"
              >
                Facebook
              </a>
            </li>
          </ul>
        </Col>
      </Row>
      <Paragraph className="text-gray-500 text-xs mt-8">
        © {new Date().getFullYear()} Doccure. All rights reserved.
      </Paragraph>
    </Footer>
  );
};

export default HomeFooter;
