import { Component } from 'react';
import { string } from 'prop-types';
import Modal from 'components/Modal/Modal';
import { Link, Image, Thumb, Desc, Container } from './ImageGalleryItem.styled';
import { Spinner } from 'components/Loader/Loader';

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

  handleModalImgLoaded = e => {
    this.setState(cur => ({
      clickedImage: { ...cur.clickedImage, isLoaded: true },
    }));
  };

  render() {
    const { handleImageClick, handleModalClose, handleModalImgLoaded } = this;
    const { url, tags, preview } = this.props;
    const { clickedImage, showModal } = this.state;
    // const style = { position: 'absolute', top: 0, left: 0 };

    return (
      <>
        <Link href={url} onClick={e => handleImageClick(e, { url, tags })}>
          <Image src={preview} alt={tags} loading="lazy" />
        </Link>

        {showModal && (
          <Modal onClose={handleModalClose} bgColor={COLOR_MODAL_BG}>
            <Container>
              <Spinner width={40} />
              <Thumb>
                <img
                  src={clickedImage.url}
                  alt={clickedImage.tags}
                  onLoad={handleModalImgLoaded}
                />
                {clickedImage.isLoaded && <Desc>{clickedImage.tags}</Desc>}
              </Thumb>
            </Container>
          </Modal>
        )}
      </>
    );
  }
}
