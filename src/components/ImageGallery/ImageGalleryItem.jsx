import { Component } from 'react';
import { string } from 'prop-types';
import Modal from 'components/Modal/Modal';
import { Link, Image, Thumb, Desc } from './ImageGalleryItem.styled';

const COLOR_MODAL_BG = 'rgb(255 255 255 / 0.7)';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    url: string,
    tags: string,
    preview: string,
  };

  state = { clickedImage: null, showModal: false };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  handleImageClick = (e, clickedImage) => {
    e.preventDefault();
    this.setState({ clickedImage, showModal: true });
  };

  render() {
    const { handleImageClick, handleModalClose } = this;
    const { url, tags, preview } = this.props;
    const { clickedImage, showModal } = this.state;

    return (
      <>
        <Link href={url} onClick={e => handleImageClick(e, { url, tags })}>
          <Image src={preview} alt={tags} loading="lazy" />
        </Link>

        {showModal && (
          <Modal onClose={handleModalClose} bgColor={COLOR_MODAL_BG}>
            <Thumb>
              <img src={clickedImage.url} alt={clickedImage.tags} />
              <Desc>{clickedImage.tags}</Desc>
            </Thumb>
          </Modal>
        )}
      </>
    );
  }
}
