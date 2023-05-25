import { RotatingLines } from 'react-loader-spinner';
import Modal from 'components/Modal/Modal';

const COLOR_MODAL_BG = 'rgb(255 255 255 / 0.8)';

export const Spinner = props => (
  <RotatingLines
    strokeColor="black"
    strokeWidth="3"
    animationDuration="0.75"
    width="60"
    visible={true}
    {...props}
  />
);

export const Loader = ({ visible }) =>
  visible && (
    <Modal bgColor={COLOR_MODAL_BG}>
      <Spinner />
    </Modal>
  );
