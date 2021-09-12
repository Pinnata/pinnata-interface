import Modal from "react-modal";
import QRCode from "qrcode.react";
import { Container, Heading } from "theme-ui";

interface IProps {
  name: string;
  address: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const QRNameModal: React.FC<IProps> = ({
  name,
  address,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel={name}
      style={{
        content: {
          borderRadius: "6px",
          position: "absolute",
          backgroundColor: "var(--theme-ui-colors-background)",
          width: "fit-content",
          height: "fit-content",
          top: "calc(50% - 100px)",
          left: "calc(50% - 100px)",
          margin: 0,
          padding: "32px",
        },
      }}
    >
      <Container sx={{ textAlign: "center" }}>
        <Heading as="h2" mb={4}>
          {name}.nom
        </Heading>
        <QRCode value={`celo://wallet/pay?address=${address}`} />
      </Container>
    </Modal>
  );
};
