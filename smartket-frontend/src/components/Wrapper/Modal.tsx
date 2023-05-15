import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 16,
    backgroundColor: 'transparent',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(2px)',
  },
}

interface ModalWrapperProps {
  children?: React.ReactNode
  isOpen: boolean
  onClose?: () => void
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children = <></>,
  isOpen,
  onClose = () => null,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} ariaHideApp={false}>
      {children}
    </Modal>
  )
}

export default ModalWrapper
